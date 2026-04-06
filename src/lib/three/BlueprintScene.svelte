<script lang="ts">
	import { useThrelte, useTask } from '@threlte/core';
	import * as THREE from 'three';
	import { theme } from '$lib/stores/theme';

	const { scene } = useThrelte();

	// ─── Grid layout ───────────────────────────────────────────────────────────
	//  7 cols × 5 rows, spacing 1.5 × 1.0.  Camera at z=7 fits x ±4.5.
	//
	//  col:  -4.5   -3.0   -1.5    0.0    1.5    3.0    4.5
	//
	//  y= 2.0  [0]BP──►[2]Init──►[3]◆──T──►[4]Check──►[5]◆──T──►[6]SpawnFull
	//  y= 1.0   ·    [9]Cfg↑  [10]Rdy↑  [7]EarlyRet [11]Val⇄  [8]SpawnLite
	//
	//  y=-0.6  [1]ET──►[12]Mv──►[13]◆──T──►[14]Aud──►[15]◆──T──►[16]Sync──►[17]Plat
	//  y=-1.4   ·        ·    [18]Stop   [20]Mix⇄  [19]Fade
	//  y=-2.2   ·    [21]Δt↑  [22]Act↑  [23]St↑   [24]Spd↑
	//
	//  ◆ = branch node (amber diamond)   ⇄ = pure node connected on BOTH sides
	//  ↑ = pure feeding up    ─T→ True path    ─F↘ False path (diagonal down)

	const BASE_POS = [
		[-4.5,  2.0, 0.0],  //  0  Event BeginPlay     RED
		[-4.5, -0.6, 0.0],  //  1  Event Tick           RED
		[-3.0,  2.0, 0.0],  //  2  Init                 exec
		[-1.5,  2.0, 0.0],  //  3  Branch1              branch ◆
		[ 0.0,  2.0, 0.0],  //  4  Check                exec
		[ 1.5,  2.0, 0.0],  //  5  Branch2              branch ◆
		[ 3.0,  2.0, 0.0],  //  6  SpawnFull            exec   True ← Brn2
		[ 0.0,  1.0, 0.0],  //  7  EarlyReturn          exec   False ← Brn1
		[ 3.0,  1.0, 0.0],  //  8  SpawnLite            exec   False ← Brn2
		[-3.0,  1.0, 0.0],  //  9  GetConfig            pure   → Init
		[-1.5,  1.0, 0.0],  // 10  IsReady              pure   → Brn1 cond
		[ 1.5,  1.0, 0.0],  // 11  Validate             pure ⇄ receives Check output → Brn2 cond
		[-3.0, -0.6, 0.0],  // 12  UpdateMovement       exec
		[-1.5, -0.6, 0.0],  // 13  Branch3              branch ◆
		[ 0.0, -0.6, 0.0],  // 14  UpdateAudio          exec
		[ 1.5, -0.6, 0.0],  // 15  Branch4              branch ◆
		[ 3.0, -0.6, 0.0],  // 16  SyncPlatform         exec   True ← Brn4
		[ 4.5, -0.6, 0.0],  // 17  Platform             exec
		[-1.5, -1.4, 0.0],  // 18  StopMovement         exec   False ← Brn3
		[ 1.5, -1.4, 0.0],  // 19  FadeOut              exec   False ← Brn4
		[ 0.0, -1.4, 0.0],  // 20  MixState             pure ⇄ from Audio + GetSpeed → Brn4 cond
		[-3.0, -2.2, 0.0],  // 21  GetDeltaTime         pure   → Move
		[-1.5, -2.2, 0.0],  // 22  IsActive             pure   → Brn3 cond
		[ 0.0, -2.2, 0.0],  // 23  GetAudioState        pure   → Audio
		[ 1.5, -2.2, 0.0],  // 24  GetSpeed             pure   → MixState
	] as const;
	const N = BASE_POS.length; // 25

	const BRANCH_NODES = new Set([3, 5, 13, 15]);
	const PURE_NODES   = new Set([9, 10, 11, 20, 21, 22, 23, 24]);
	const EVENT_NODES  = new Set([0, 1]);

	const basePos = BASE_POS.map(([x, y, z]) => new THREE.Vector3(x, y, z));
	const nodePos  = basePos.map(p => p.clone());

	const nodeGeos: THREE.BufferGeometry[] = [
		new THREE.IcosahedronGeometry(0.22, 1),   //  0 BeginPlay   event
		new THREE.DodecahedronGeometry(0.20, 0),  //  1 EventTick   event
		new THREE.DodecahedronGeometry(0.17, 0),  //  2 Init        exec
		new THREE.OctahedronGeometry(0.21, 0),    //  3 Branch1     ◆
		new THREE.IcosahedronGeometry(0.17, 0),   //  4 Check       exec
		new THREE.OctahedronGeometry(0.21, 0),    //  5 Branch2     ◆
		new THREE.DodecahedronGeometry(0.17, 0),  //  6 SpawnFull   exec
		new THREE.TetrahedronGeometry(0.15, 0),   //  7 EarlyReturn exec (dead-end, small)
		new THREE.TetrahedronGeometry(0.15, 0),   //  8 SpawnLite   exec
		new THREE.TetrahedronGeometry(0.12, 0),   //  9 GetConfig   pure
		new THREE.TetrahedronGeometry(0.12, 0),   // 10 IsReady     pure
		new THREE.TetrahedronGeometry(0.14, 0),   // 11 Validate    pure ⇄ (slightly bigger)
		new THREE.DodecahedronGeometry(0.17, 0),  // 12 Move        exec
		new THREE.OctahedronGeometry(0.21, 0),    // 13 Branch3     ◆
		new THREE.IcosahedronGeometry(0.17, 1),   // 14 Audio       exec
		new THREE.OctahedronGeometry(0.21, 0),    // 15 Branch4     ◆
		new THREE.DodecahedronGeometry(0.17, 0),  // 16 Sync        exec
		new THREE.IcosahedronGeometry(0.16, 0),   // 17 Platform    exec
		new THREE.TetrahedronGeometry(0.15, 0),   // 18 StopMove    exec (dead-end)
		new THREE.TetrahedronGeometry(0.15, 0),   // 19 FadeOut     exec (dead-end)
		new THREE.TetrahedronGeometry(0.14, 0),   // 20 MixState    pure ⇄ (slightly bigger)
		new THREE.TetrahedronGeometry(0.12, 0),   // 21 GetDelta    pure
		new THREE.TetrahedronGeometry(0.12, 0),   // 22 IsActive    pure
		new THREE.TetrahedronGeometry(0.12, 0),   // 23 GetState    pure
		new THREE.TetrahedronGeometry(0.12, 0),   // 24 GetSpeed    pure
	];

	const EVT_COLOR    = '#e05050';
	const BRANCH_COLOR = '#e8a020';
	const EXEC_COLOR   = '#81e6d9';
	const PURE_COLOR   = '#4c9be8';

	function nodeColor(i: number) {
		if (EVENT_NODES.has(i))  return EVT_COLOR;
		if (BRANCH_NODES.has(i)) return BRANCH_COLOR;
		if (PURE_NODES.has(i))   return PURE_COLOR;
		return EXEC_COLOR;
	}
	function nodeBaseEmissive(i: number) {
		if (EVENT_NODES.has(i))  return 0.65;
		if (BRANCH_NODES.has(i)) return 0.60;
		if (PURE_NODES.has(i))   return 0.50;
		return 0.35;
	}

	const nodeMats = nodeGeos.map((_, i) => new THREE.MeshStandardMaterial({
		wireframe: true,
		color:             nodeColor(i),
		emissive:          nodeColor(i),
		emissiveIntensity: nodeBaseEmissive(i),
	}));
	const nodeMeshes = nodeGeos.map((g, i) => new THREE.Mesh(g, nodeMats[i]));

	const nodeFlash  = new Float32Array(N);
	const floatPhase = Float32Array.from({ length: N }, (_, i) => i * 0.92);
	const rotRate    = new Float32Array([
		0.28, 0.37, 0.22, 0.44, 0.31, 0.44, 0.25, 0.35,
		0.29, 0.38, 0.27, 0.41, 0.30, 0.46, 0.33, 0.42,
		0.24, 0.36, 0.39, 0.32, 0.45, 0.26, 0.43, 0.34, 0.28,
	]);

	// ─── Connections ───────────────────────────────────────────────────────────
	//  'exec' = yellow wires (execution flow, True and False branch outputs)
	//  'pure' = blue  wires (data / pure function — can arrive from multiple sides)
	type ConnType = 'exec' | 'pure';
	type Conn = readonly [number, number, ConnType];

	const CONNS: Conn[] = [
		// ── Chain 1: BeginPlay ──────────────────────────────────────────────────
		[ 0,  2, 'exec'],  // BP         → Init           horizontal
		[ 2,  3, 'exec'],  // Init        → Branch1        horizontal
		[ 3,  4, 'exec'],  // Branch1  ─T→ Check           horizontal (same row)
		[ 3,  7, 'exec'],  // Branch1  ─F↘ EarlyReturn     diagonal ↓  (nested branch)
		[ 4,  5, 'exec'],  // Check       → Branch2        horizontal
		[ 5,  6, 'exec'],  // Branch2  ─T→ SpawnFull       horizontal (same row)
		[ 5,  8, 'exec'],  // Branch2  ─F↘ SpawnLite       diagonal ↓  (nested branch)
		// Chain 1 pure — vertical feeds + both-sides node
		[ 9,  2, 'pure'],  // GetConfig   ↑ Init           vertical (input from below)
		[10,  3, 'pure'],  // IsReady     ↑ Branch1 cond   vertical
		[ 4, 11, 'pure'],  // Check      → Validate        Check outputs data to pure ← BOTH SIDES
		[11,  5, 'pure'],  // Validate   → Branch2 cond    pure feeds branch ← BOTH SIDES

		// ── Chain 2: EventTick ──────────────────────────────────────────────────
		[ 1, 12, 'exec'],  // ET          → Move           horizontal
		[12, 13, 'exec'],  // Move         → Branch3        horizontal
		[13, 14, 'exec'],  // Branch3  ─T→ Audio           horizontal (same row)
		[13, 18, 'exec'],  // Branch3  ─F↘ StopMovement    diagonal ↓  (nested branch)
		[14, 15, 'exec'],  // Audio        → Branch4        horizontal
		[15, 16, 'exec'],  // Branch4  ─T→ SyncPlatform    horizontal (same row)
		[15, 19, 'exec'],  // Branch4  ─F↘ FadeOut         diagonal ↓  (nested branch)
		[16, 17, 'exec'],  // SyncPlatform → Platform       horizontal
		// Chain 2 pure — vertical feeds + both-sides MixState node
		[21, 12, 'pure'],  // GetDeltaTime ↑ Move          vertical
		[22, 13, 'pure'],  // IsActive     ↑ Branch3 cond  vertical
		[23, 14, 'pure'],  // GetAudioState↑ Audio         vertical
		[14, 20, 'pure'],  // Audio       → MixState        exec outputs to pure ← BOTH SIDES
		[24, 20, 'pure'],  // GetSpeed    → MixState        pure-to-pure chain   ← BOTH SIDES
		[20, 15, 'pure'],  // MixState    → Branch4 cond   pure feeds branch    ← BOTH SIDES
	];
	const STEPS = 32;

	const matExec = new THREE.LineBasicMaterial({ color: '#e8a020', transparent: true, opacity: 0.70 });
	const matPure = new THREE.LineBasicMaterial({ color: '#4c9be8', transparent: true, opacity: 0.55 });

	const connArrs  = CONNS.map(() => new Float32Array((STEPS + 1) * 3));
	const connGeos  = connArrs.map(arr => {
		const g = new THREE.BufferGeometry();
		g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
		return g;
	});
	const connLines = CONNS.map(([,, t], i) =>
		new THREE.Line(connGeos[i], t === 'exec' ? matExec : matPure)
	);

	// ─── Packets ───────────────────────────────────────────────────────────────
	const PKT     = 2;
	const PKT_TOT = CONNS.length * PKT;
	const pktArr  = new Float32Array(PKT_TOT * 3);
	const pktGeo  = new THREE.BufferGeometry();
	pktGeo.setAttribute('position', new THREE.BufferAttribute(pktArr, 3));

	const pktMat = new THREE.PointsMaterial({
		size: 0.060, sizeAttenuation: true,
		color: '#ffdd88',
		transparent: true, opacity: 0.90,
		blending: THREE.AdditiveBlending, depthWrite: false,
	});
	const pktMesh = new THREE.Points(pktGeo, pktMat);
	pktMesh.frustumCulled = false;

	const pktTs     = Float32Array.from({ length: PKT_TOT }, (_, i) => (i % PKT) / PKT);
	const pktSpeeds = CONNS.map(([,, t]) => t === 'exec' ? 0.50 : 0.32);

	// ─── Ping rings ─────────────────────────────────────────────────────────────
	const PING_SCALE_MAX = 2.2;
	const pingGeo  = new THREE.TorusGeometry(0.18, 0.012, 5, 24);
	const pingMat  = new THREE.MeshBasicMaterial({ color: '#ffdd88', transparent: true, opacity: 0 });
	const pingMesh = new THREE.Mesh(pingGeo, pingMat);
	let pingNode  = -1;
	let pingTimer = 0;

	// ─── Group ─────────────────────────────────────────────────────────────────
	const group = new THREE.Group();
	[...nodeMeshes, ...connLines, pktMesh, pingMesh].forEach(o => group.add(o));

	$effect(() => {
		scene.add(group);
		return () => {
			scene.remove(group);
			nodeGeos.forEach(g => g.dispose());
			connGeos.forEach(g => g.dispose());
			pktGeo.dispose();
			pingGeo.dispose();
			nodeMats.forEach(m => m.dispose());
			[matExec, matPure, pktMat, pingMat].forEach(m => m.dispose());
		};
	});

	// ─── Theme reactive colours ────────────────────────────────────────────────
	$effect(() => {
		const cExec = $theme === 'dark' ? '#81e6d9' : '#ed8936';
		const cLine = $theme === 'dark' ? '#e8a020' : '#5a67d8';
		const cPkt  = $theme === 'dark' ? '#ffdd88' : '#f6c96a';

		nodeMats.forEach((m, i) => {
			if (EVENT_NODES.has(i) || BRANCH_NODES.has(i) || PURE_NODES.has(i)) return;
			m.color.set(cExec);
			m.emissive.set(cExec);
		});
		matExec.color.set(cLine);
		pktMat.color.set(cPkt);
		pingMat.color.set(cPkt);
	});

	// ─── Bezier: UE-style horizontal S-curve ───────────────────────────────────
	//  Same-row (horizontal) connections → straight line
	//  Cross-row (diagonal/vertical) → smooth curve
	function bezier(
		t: number,
		ax: number, ay: number, az: number,
		bx: number, by: number, bz: number,
		c1x: number, c2x: number,
		out: Float32Array, offset: number,
	) {
		const mt = 1 - t, mt2 = mt * mt, mt3 = mt2 * mt;
		const t2 = t * t, t3 = t2 * t;
		out[offset]     = mt3*ax + 3*mt2*t*c1x + 3*mt*t2*c2x + t3*bx;
		out[offset + 1] = mt3*ay + 3*mt2*t*ay  + 3*mt*t2*by  + t3*by;
		out[offset + 2] = mt3*az + 3*mt2*t*az  + 3*mt*t2*bz  + t3*bz;
	}

	// ─── Animation loop ────────────────────────────────────────────────────────
	let time = 0;

	useTask((delta) => {
		time += delta;

		group.rotation.y = Math.sin(time * 0.10) * 0.10;
		group.rotation.x = Math.sin(time * 0.07) * 0.03;

		for (let i = 0; i < N; i++) {
			const ph = floatPhase[i];
			nodePos[i].set(
				basePos[i].x + Math.sin(time * 0.38 + ph)        * 0.016,
				basePos[i].y + Math.sin(time * 0.50 + ph * 1.31) * 0.020,
				basePos[i].z + Math.sin(time * 0.33 + ph * 0.72) * 0.010,
			);
			nodeMeshes[i].position.copy(nodePos[i]);
			nodeMeshes[i].rotation.x += delta * rotRate[i];
			nodeMeshes[i].rotation.y += delta * (rotRate[i] * 1.4);

			const base = nodeBaseEmissive(i);
			if (nodeFlash[i] > 0) {
				nodeFlash[i] = Math.max(0, nodeFlash[i] - delta * 3.0);
				nodeMats[i].emissiveIntensity = base + nodeFlash[i] * 3.0;
			} else {
				nodeMats[i].emissiveIntensity = base;
			}
		}

		if (pingNode >= 0) {
			pingTimer += delta;
			const progress = pingTimer / 0.55;
			if (progress >= 1.0) {
				pingNode = -1;
				pingMat.opacity = 0;
			} else {
				const s = 1.0 + progress * (PING_SCALE_MAX - 1.0);
				pingMesh.position.copy(nodePos[pingNode]);
				pingMesh.scale.setScalar(s);
				pingMat.opacity = (1 - progress) * 0.7;
			}
		}

		for (let ci = 0; ci < CONNS.length; ci++) {
			const [fi, ti] = CONNS[ci];
			const A = nodePos[fi];
			const B = nodePos[ti];

			const hdx = Math.abs(B.x - A.x) * 0.5 + 0.45;
			const c1x = A.x + hdx;
			const c2x = B.x - hdx;

			const arr = connArrs[ci];
			for (let s = 0; s <= STEPS; s++) {
				bezier(s / STEPS, A.x, A.y, A.z, B.x, B.y, B.z, c1x, c2x, arr, s * 3);
			}
			connGeos[ci].attributes.position.needsUpdate = true;

			const spd = pktSpeeds[ci];
			for (let p = 0; p < PKT; p++) {
				const pi   = ci * PKT + p;
				const prev = pktTs[pi];
				pktTs[pi]  = (prev + delta * spd) % 1.0;

				if (pktTs[pi] < prev) {
					nodeFlash[ti] = 1.0;
					if (pingNode < 0) { pingNode = ti; pingTimer = 0; }
				}

				bezier(pktTs[pi], A.x, A.y, A.z, B.x, B.y, B.z, c1x, c2x, pktArr, pi * 3);
			}
		}
		pktGeo.attributes.position.needsUpdate = true;
	});
</script>
