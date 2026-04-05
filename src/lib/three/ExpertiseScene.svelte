<script lang="ts">
	import { useThrelte, useTask } from '@threlte/core';
	import * as THREE from 'three';
	import { theme } from '$lib/stores/theme';

	const { scene } = useThrelte();

	// ─── Materials ─────────────────────────────────────────────────────────────
	const matCore   = new THREE.MeshBasicMaterial({ wireframe: true, color: '#e8a020' });
	const matGlow   = new THREE.MeshStandardMaterial({
		color: '#0d0400', emissive: '#e8a020', emissiveIntensity: 0.5,
		transparent: true, opacity: 0.10,
	});
	const matNode   = new THREE.MeshBasicMaterial({ wireframe: true, color: '#81e6d9' });
	const matLine   = new THREE.LineBasicMaterial({ color: '#e8a020', transparent: true, opacity: 0.30 });
	const matDot    = new THREE.PointsMaterial({
		color: '#ffcc66', size: 0.09, sizeAttenuation: true,
		transparent: true, opacity: 0.95,
		blending: THREE.AdditiveBlending, depthWrite: false,
	});
	const matDebris = new THREE.MeshBasicMaterial({ wireframe: true, color: '#4c9be8', transparent: true, opacity: 0.45 });
	const matRing   = new THREE.MeshBasicMaterial({ wireframe: true, color: '#e8a020', transparent: true, opacity: 0.12 });

	// ─── Central body ──────────────────────────────────────────────────────────
	const centralMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.12, 1), matCore);
	const centralGlow = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0,  3), matGlow);
	// Equatorial ring
	const equatRing   = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.012, 4, 80), matRing);
	equatRing.rotation.x = Math.PI / 2;

	// ─── Orbit nodes (each represents a discipline) ────────────────────────────
	// r=orbit radius, spd=orbit speed, incl=inclination, ph=start phase, rs=self-rotation speeds
	const NODE_DEFS = [
		{ geo: new THREE.OctahedronGeometry(0.22, 0),       r: 2.2, spd: 0.44, incl:  0.40, ph: 0.0,  rs: [0.80, 0.50, 0.30] },
		{ geo: new THREE.IcosahedronGeometry(0.17, 0),      r: 1.85,spd: 0.68, incl:  1.20, ph: 1.05, rs: [0.40, 0.90, 0.20] },
		{ geo: new THREE.DodecahedronGeometry(0.19, 0),     r: 2.45,spd: 0.31, incl:  0.65, ph: 2.10, rs: [0.60, 0.30, 0.70] },
		{ geo: new THREE.TorusGeometry(0.15, 0.05, 6, 10), r: 2.0, spd: 0.57, incl: -0.50, ph: 3.50, rs: [1.20, 0.40, 0.55] },
		{ geo: new THREE.TetrahedronGeometry(0.22, 0),      r: 2.3, spd: 0.41, incl:  1.40, ph: 4.20, rs: [0.30, 0.70, 0.90] },
		{ geo: new THREE.OctahedronGeometry(0.15, 0),       r: 1.65,spd: 0.80, incl: -0.95, ph: 5.50, rs: [0.50, 0.60, 0.40] },
	] as const;

	const nodeMeshes = NODE_DEFS.map(({ geo }) => new THREE.Mesh(geo, matNode));
	const nodePos    = Array.from({ length: 6 }, () => new THREE.Vector3());

	// Per-node state
	const nodeAngles = new Float32Array(NODE_DEFS.map(n => n.ph));
	const nodeEul    = [
		new Float32Array(6), // x
		new Float32Array(6), // y
		new Float32Array(6), // z
	];

	// ─── Connection lines (center → each node) ─────────────────────────────────
	const linePosArrs = NODE_DEFS.map(() => new Float32Array(6)); // [0,0,0, nx,ny,nz]
	const lineGeos    = linePosArrs.map(arr => {
		const g = new THREE.BufferGeometry();
		g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
		return g;
	});
	const connLines   = lineGeos.map(g => new THREE.Line(g, matLine));

	// ─── Energy travelers (3 per line, traveling from center to node) ──────────
	const TPL        = 3;
	const TRAV_COUNT = 6 * TPL;
	const travPosArr = new Float32Array(TRAV_COUNT * 3);
	const travGeo    = new THREE.BufferGeometry();
	travGeo.setAttribute('position', new THREE.BufferAttribute(travPosArr, 3));
	const travelers  = new THREE.Points(travGeo, matDot);

	const travTs     = Float32Array.from(
		{ length: TRAV_COUNT },
		(_, i) => (i % TPL) / TPL
	);

	// ─── Background debris (distant slowly-drifting shapes) ────────────────────
	const DEBRIS_N    = 10;
	const debrisGeo   = new THREE.IcosahedronGeometry(0.12, 0);
	const debrisMesh  = new THREE.InstancedMesh(debrisGeo, matDebris, DEBRIS_N);
	debrisMesh.frustumCulled = false;

	const debrisAngles = Float32Array.from({ length: DEBRIS_N }, (_, i) => i * (Math.PI * 2 / DEBRIS_N));
	const debrisIncls  = Float32Array.from({ length: DEBRIS_N }, () => (Math.random() - 0.5) * Math.PI * 0.9);
	const debrisRadii  = Float32Array.from({ length: DEBRIS_N }, () => 3.2 + Math.random() * 1.0);
	const debrisRotX   = new Float32Array(DEBRIS_N);
	const debrisRotY   = new Float32Array(DEBRIS_N);
	const debrisSpds   = Float32Array.from({ length: DEBRIS_N }, () => 0.2 + Math.random() * 0.4);
	const dummy        = new THREE.Object3D();

	// ─── Scene add / cleanup ───────────────────────────────────────────────────
	const allObjects = [
		centralMesh, centralGlow, equatRing,
		...nodeMeshes,
		...connLines,
		travelers,
		debrisMesh,
	];

	$effect(() => {
		allObjects.forEach(o => scene.add(o));
		return () => {
			allObjects.forEach(o => scene.remove(o));
			centralMesh.geometry.dispose();
			centralGlow.geometry.dispose();
			equatRing.geometry.dispose();
			NODE_DEFS.forEach(({ geo }) => geo.dispose());
			lineGeos.forEach(g => g.dispose());
			travGeo.dispose();
			debrisGeo.dispose();
			[matCore, matGlow, matNode, matLine, matDot, matDebris, matRing].forEach(m => m.dispose());
		};
	});

	// ─── Theme-reactive colours ────────────────────────────────────────────────
	$effect(() => {
		const dark     = $theme === 'dark';
		const stranger = $theme === 'strangerThings';

		const cMain    = stranger ? '#e53e3e' : dark ? '#e8a020' : '#5a67d8';
		const cNode    = stranger ? '#fc8181' : dark ? '#81e6d9' : '#ed8936';
		const cDebris  = stranger ? '#fc8181' : dark ? '#4c9be8' : '#667eea';
		const cDot     = stranger ? '#fc8181' : dark ? '#ffcc66' : '#f6ad55';
		const cRing    = stranger ? '#e53e3e' : dark ? '#e8a020' : '#5a67d8';

		matCore.color.set(cMain);
		matLine.color.set(cMain);
		matGlow.emissive.set(cMain);
		matNode.color.set(cNode);
		matDebris.color.set(cDebris);
		matDot.color.set(cDot);
		matRing.color.set(cRing);
	});

	// ─── Animation loop ────────────────────────────────────────────────────────
	useTask((delta) => {
		// Central body
		centralMesh.rotation.y += delta * 0.08;
		centralMesh.rotation.x += delta * 0.025;
		centralGlow.rotation.copy(centralMesh.rotation);
		equatRing.rotation.z   += delta * 0.04;

		// Orbit nodes
		for (let i = 0; i < 6; i++) {
			const def = NODE_DEFS[i];
			nodeAngles[i] += def.spd * delta;
			const a = nodeAngles[i];

			// Tilted orbit: rotate the XZ orbit plane around the X axis by incl
			const x =  Math.cos(a) * def.r;
			const y = -Math.sin(a) * def.r * Math.sin(def.incl);
			const z =  Math.sin(a) * def.r * Math.cos(def.incl);

			nodePos[i].set(x, y, z);
			nodeMeshes[i].position.set(x, y, z);

			nodeEul[0][i] += def.rs[0] * delta;
			nodeEul[1][i] += def.rs[1] * delta;
			nodeEul[2][i] += def.rs[2] * delta;
			nodeMeshes[i].rotation.set(nodeEul[0][i], nodeEul[1][i], nodeEul[2][i]);
		}

		// Connection lines: update the far endpoint to follow each node
		for (let i = 0; i < 6; i++) {
			linePosArrs[i][3] = nodePos[i].x;
			linePosArrs[i][4] = nodePos[i].y;
			linePosArrs[i][5] = nodePos[i].z;
			lineGeos[i].attributes.position.needsUpdate = true;
		}

		// Energy travelers
		for (let i = 0; i < TRAV_COUNT; i++) {
			travTs[i] = (travTs[i] + delta * 0.38) % 1.0;
			const ni  = Math.floor(i / TPL);
			const t   = travTs[i];
			travPosArr[i * 3]     = nodePos[ni].x * t;
			travPosArr[i * 3 + 1] = nodePos[ni].y * t;
			travPosArr[i * 3 + 2] = nodePos[ni].z * t;
		}
		travGeo.attributes.position.needsUpdate = true;

		// Background debris
		for (let i = 0; i < DEBRIS_N; i++) {
			debrisAngles[i] += 0.055 * delta;
			const a    = debrisAngles[i];
			const incl = debrisIncls[i];
			const r    = debrisRadii[i];

			dummy.position.set(
				Math.cos(a) * r,
				-Math.sin(a) * r * Math.sin(incl),
				 Math.sin(a) * r * Math.cos(incl)
			);
			debrisRotX[i] += debrisSpds[i] * delta;
			debrisRotY[i] += debrisSpds[i] * 0.7 * delta;
			dummy.rotation.set(debrisRotX[i], debrisRotY[i], 0);
			dummy.updateMatrix();
			debrisMesh.setMatrixAt(i, dummy.matrix);
		}
		debrisMesh.instanceMatrix.needsUpdate = true;
	});
</script>
