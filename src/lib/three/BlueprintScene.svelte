<script lang="ts">
	import { useThrelte, useTask } from '@threlte/core';
	import * as THREE from 'three';
	import { theme } from '$lib/stores/theme';

	const { scene } = useThrelte();

	// ─── Node layout ───────────────────────────────────────────────────────────
	// 7 nodes representing the engineering disciplines
	const BASE_POS = [
		[-2.8,  0.3,  0.0],   // 0  Entry / BeginPlay
		[-1.4,  1.0,  0.3],   // 1  Input Handler
		[ 0.1,  0.5,  0.0],   // 2  Gameplay Logic   ← main hub
		[ 0.0, -0.7,  0.4],   // 3  Audio System
		[-1.2, -0.7, -0.2],   // 4  Tools Pipeline
		[ 1.7,  0.2,  0.2],   // 5  Platform (PS)
		[ 2.9,  0.0,  0.0],   // 6  EndPlay / Output
	] as const;
	const N = BASE_POS.length;

	const basePos = BASE_POS.map(([x, y, z]) => new THREE.Vector3(x, y, z));
	const nodePos  = basePos.map(p => p.clone());   // updated every frame

	const nodeGeos = [
		new THREE.IcosahedronGeometry(0.17, 1),           // Entry
		new THREE.OctahedronGeometry(0.19, 0),            // Input
		new THREE.DodecahedronGeometry(0.21, 0),          // Gameplay (biggest)
		new THREE.TorusGeometry(0.15, 0.05, 8, 12),      // Audio   (ring = speaker)
		new THREE.TetrahedronGeometry(0.19, 0),           // Tools
		new THREE.IcosahedronGeometry(0.16, 0),           // Platform
		new THREE.IcosahedronGeometry(0.17, 1),           // Exit
	];

	const nodeMats = nodeGeos.map(() =>
		new THREE.MeshStandardMaterial({
			wireframe: true,
			color:            '#81e6d9',
			emissive:         '#81e6d9',
			emissiveIntensity: 0.35,
		})
	);
	const nodeMeshes = nodeGeos.map((g, i) => new THREE.Mesh(g, nodeMats[i]));

	// Per-node state
	const nodeFlash  = new Float32Array(N);
	const floatPhase = Float32Array.from({ length: N }, (_, i) => i * 0.92);
	// Unique self-rotation rates (so no two nodes spin identically)
	const rotRate = Float32Array.from({ length: N }, (_, i) => [0.28,0.37,0.22,0.44,0.31,0.40,0.25][i]);

	// ─── Connections ───────────────────────────────────────────────────────────
	// [from, to, type]  exec = orange execution flow   data = teal data flow
	type Conn = readonly [number, number, 'exec' | 'data'];
	const CONNS: Conn[] = [
		[0, 1, 'exec'], [1, 2, 'exec'], [2, 5, 'exec'], [5, 6, 'exec'], // exec path
		[1, 4, 'data'], [2, 3, 'data'], [4, 2, 'data'], [3, 5, 'data'], // data flows
	];
	const STEPS = 32;   // bezier sample count

	const matExec = new THREE.LineBasicMaterial({ color: '#e8a020', transparent: true, opacity: 0.55 });
	const matData = new THREE.LineBasicMaterial({ color: '#4c9be8', transparent: true, opacity: 0.38 });

	const connArrs  = CONNS.map(() => new Float32Array((STEPS + 1) * 3));
	const connGeos  = connArrs.map(arr => {
		const g = new THREE.BufferGeometry();
		g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
		return g;
	});
	const connLines = CONNS.map(([,, t], i) =>
		new THREE.Line(connGeos[i], t === 'exec' ? matExec : matData)
	);

	// ─── Packets (glowing dots traveling along wires) ──────────────────────────
	const PKT       = 2;                          // packets per connection
	const PKT_TOT   = CONNS.length * PKT;         // 16 total
	const pktArr    = new Float32Array(PKT_TOT * 3);
	const pktGeo    = new THREE.BufferGeometry();
	pktGeo.setAttribute('position', new THREE.BufferAttribute(pktArr, 3));

	const pktMat  = new THREE.PointsMaterial({
		size: 0.075, sizeAttenuation: true,
		color: '#ffdd88',
		transparent: true, opacity: 0.95,
		blending: THREE.AdditiveBlending, depthWrite: false,
	});
	const pktMesh = new THREE.Points(pktGeo, pktMat);
	pktMesh.frustumCulled = false;

	// Stagger packet start positions so two per wire aren't on top of each other
	const pktTs = Float32Array.from({ length: PKT_TOT }, (_, i) => (i % PKT) / PKT);
	// exec wires: slightly faster
	const pktSpeeds = CONNS.map(([,, t]) => t === 'exec' ? 0.44 : 0.30);

	// ─── Ping rings: brief expanding torus when node executes ─────────────────
	const PING_SCALE_MAX = 2.4;
	const pingGeo   = new THREE.TorusGeometry(0.18, 0.012, 5, 24);
	const pingMat   = new THREE.MeshBasicMaterial({ color: '#ffdd88', transparent: true, opacity: 0 });
	const pingMesh  = new THREE.Mesh(pingGeo, pingMat);
	// We only show one ping at a time (the most recently fired one)
	let pingNode  = -1;
	let pingTimer = 0;

	// ─── Group — so we can sway the whole graph as one ─────────────────────────
	const group = new THREE.Group();
	[...nodeMeshes, ...connLines, pktMesh, pingMesh].forEach(o => group.add(o));

	// ─── Scene add / cleanup ───────────────────────────────────────────────────
	$effect(() => {
		scene.add(group);
		return () => {
			scene.remove(group);
			nodeGeos.forEach(g => g.dispose());
			connGeos.forEach(g => g.dispose());
			pktGeo.dispose();
			pingGeo.dispose();
			nodeMats.forEach(m => m.dispose());
			[matExec, matData, pktMat, pingMat].forEach(m => m.dispose());
		};
	});

	// ─── Theme reactive colours ────────────────────────────────────────────────
	$effect(() => {
		const isDark = $theme === 'dark';
		const isST   = $theme === 'strangerThings';

		const cNode = isST ? '#fc8181' : isDark ? '#81e6d9' : '#ed8936';
		const cExec = isST ? '#e53e3e' : isDark ? '#e8a020' : '#5a67d8';
		const cData = isST ? '#fc8181' : isDark ? '#4c9be8' : '#38b2ac';
		const cPkt  = isST ? '#ff9999' : isDark ? '#ffdd88' : '#f6c96a';

		nodeMats.forEach(m => { m.color.set(cNode); m.emissive.set(cNode); });
		matExec.color.set(cExec);
		matData.color.set(cData);
		pktMat.color.set(cPkt);
		pingMat.color.set(cPkt);
	});

	// ─── Bezier helper: UE-style horizontal S-curve ────────────────────────────
	// Control points extend horizontally from each node — same as UE Blueprint wires
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

		// Breathe the whole graph gently
		group.rotation.y  = Math.sin(time * 0.10) * 0.30;
		group.rotation.x  = Math.sin(time * 0.07) * 0.06;

		// ── Nodes ────────────────────────────────────────────────────────────
		for (let i = 0; i < N; i++) {
			const ph = floatPhase[i];
			// Independent bobbing per node
			nodePos[i].set(
				basePos[i].x + Math.sin(time * 0.38 + ph)        * 0.065,
				basePos[i].y + Math.sin(time * 0.50 + ph * 1.31) * 0.110,
				basePos[i].z + Math.sin(time * 0.33 + ph * 0.72) * 0.055,
			);
			nodeMeshes[i].position.copy(nodePos[i]);

			// Self-rotation — each node tumbles at its own rate
			nodeMeshes[i].rotation.x += delta * rotRate[i];
			nodeMeshes[i].rotation.y += delta * (rotRate[i] * 1.4);

			// Flash decay → emissive glow
			if (nodeFlash[i] > 0) {
				nodeFlash[i] = Math.max(0, nodeFlash[i] - delta * 3.0);
				nodeMats[i].emissiveIntensity = 0.35 + nodeFlash[i] * 3.0;
			} else {
				nodeMats[i].emissiveIntensity = 0.35;
			}
		}

		// ── Ping ring ────────────────────────────────────────────────────────
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

		// ── Connections + packets ─────────────────────────────────────────────
		for (let ci = 0; ci < CONNS.length; ci++) {
			const [fi, ti] = CONNS[ci];
			const A = nodePos[fi];
			const B = nodePos[ti];

			const hdx = Math.abs(B.x - A.x) * 0.5 + 0.45;
			const c1x = A.x + hdx;
			const c2x = B.x - hdx;

			// Rebuild bezier curve geometry
			const arr = connArrs[ci];
			for (let s = 0; s <= STEPS; s++) {
				bezier(s / STEPS, A.x, A.y, A.z, B.x, B.y, B.z, c1x, c2x, arr, s * 3);
			}
			connGeos[ci].attributes.position.needsUpdate = true;

			// Advance packets along the curve
			const spd = pktSpeeds[ci];
			for (let p = 0; p < PKT; p++) {
				const pi  = ci * PKT + p;
				const prev = pktTs[pi];
				pktTs[pi]  = (prev + delta * spd) % 1.0;

				// Packet just looped → arrived at destination node
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
