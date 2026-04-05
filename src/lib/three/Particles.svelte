<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import * as THREE from 'three';
	import { theme } from '$lib/stores/theme';

	// ── Soft circular sprite (radial gradient on a canvas) ──────────────────
	function makeDiscTexture(size = 64): THREE.CanvasTexture {
		const canvas = document.createElement('canvas');
		canvas.width = canvas.height = size;
		const ctx = canvas.getContext('2d')!;
		const r = size / 2;
		const g = ctx.createRadialGradient(r, r, 0, r, r, r);
		g.addColorStop(0.00, 'rgba(255,255,255,1.0)');
		g.addColorStop(0.30, 'rgba(255,255,255,0.7)');
		g.addColorStop(0.65, 'rgba(255,255,255,0.15)');
		g.addColorStop(1.00, 'rgba(255,255,255,0.0)');
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, size, size);
		return new THREE.CanvasTexture(canvas);
	}

	const disc = makeDiscTexture(64);

	// ── Layer 1: distant star field (sphere distribution) ───────────────────
	const STAR_N = 2200;
	const starPos = new Float32Array(STAR_N * 3);
	for (let i = 0; i < STAR_N; i++) {
		const r     = 14 + Math.random() * 24;
		const theta = Math.random() * Math.PI * 2;
		const phi   = Math.acos(2 * Math.random() - 1);
		starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
		starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
		starPos[i * 3 + 2] = r * Math.cos(phi);
	}
	const starGeo = new THREE.BufferGeometry();
	starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

	const starMat = new THREE.PointsMaterial({
		size: 0.055,
		map: disc,
		color: '#b8ccff',
		transparent: true,
		opacity: 0.55,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		sizeAttenuation: true,
	});

	let starRef: THREE.Points | undefined = $state();

	// ── Layer 2: nebula drift cloud near the blueprint graph ────────────────
	const NEB_N = 600;
	const nebBase  = new Float32Array(NEB_N * 3);
	const nebCurr  = new Float32Array(NEB_N * 3);
	const nebPhase = new Float32Array(NEB_N);
	const nebFreq  = new Float32Array(NEB_N);

	for (let i = 0; i < NEB_N; i++) {
		// Loosely clustered around centre with Gaussian-ish falloff
		const x = (Math.random() - 0.5) * 15;
		const y = (Math.random() - 0.5) * 8;
		const z = (Math.random() - 0.5) * 10 - 1.5;
		nebBase[i * 3]     = nebCurr[i * 3]     = x;
		nebBase[i * 3 + 1] = nebCurr[i * 3 + 1] = y;
		nebBase[i * 3 + 2] = nebCurr[i * 3 + 2] = z;
		nebPhase[i] = Math.random() * Math.PI * 2;
		nebFreq[i]  = 0.25 + Math.random() * 0.35;
	}

	const nebGeo = new THREE.BufferGeometry();
	nebGeo.setAttribute('position', new THREE.BufferAttribute(nebCurr, 3));

	const nebMat = new THREE.PointsMaterial({
		size: 0.11,
		map: disc,
		color: '#50c8d8',
		transparent: true,
		opacity: 0.30,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		sizeAttenuation: true,
	});

	// ── Layer 3: large atmospheric glow orbs ────────────────────────────────
	const ORB_N = 55;
	const orbPos = new Float32Array(ORB_N * 3);
	for (let i = 0; i < ORB_N; i++) {
		orbPos[i * 3]     = (Math.random() - 0.5) * 18;
		orbPos[i * 3 + 1] = (Math.random() - 0.5) * 11;
		orbPos[i * 3 + 2] = (Math.random() - 0.5) * 9 - 3;
	}
	const orbGeo = new THREE.BufferGeometry();
	orbGeo.setAttribute('position', new THREE.BufferAttribute(orbPos, 3));

	const orbMat = new THREE.PointsMaterial({
		size: 0.55,
		map: disc,
		color: '#e8a020',
		transparent: true,
		opacity: 0.07,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		sizeAttenuation: true,
	});

	// ── Theme-reactive colours ───────────────────────────────────────────────
	$effect(() => {
		const isST   = $theme === 'strangerThings';
		const isDark = $theme === 'dark';

		starMat.color.set(isST ? '#ffaaaa' : isDark ? '#b8ccff' : '#aabbff');
		nebMat.color.set(isST  ? '#ff5050' : isDark ? '#50c8d8' : '#6688ff');
		orbMat.color.set(isST  ? '#cc2020' : isDark ? '#e8a020' : '#8866cc');
	});

	// ── Animation ───────────────────────────────────────────────────────────
	let t = 0;
	useTask((delta) => {
		t += delta;

		// Star field: very slow drift rotation
		if (starRef) {
			starRef.rotation.y = t * 0.007;
			starRef.rotation.x = t * 0.003;
		}

		// Nebula: per-particle sinusoidal drift
		for (let i = 0; i < NEB_N; i++) {
			const ph = nebPhase[i];
			const fr = nebFreq[i];
			nebCurr[i * 3]     = nebBase[i * 3]     + Math.sin(t * fr         + ph)        * 0.14;
			nebCurr[i * 3 + 1] = nebBase[i * 3 + 1] + Math.sin(t * fr * 1.35  + ph * 1.6)  * 0.20;
			nebCurr[i * 3 + 2] = nebBase[i * 3 + 2] + Math.cos(t * fr * 0.85  + ph * 0.8)  * 0.09;
		}
		nebGeo.attributes.position.needsUpdate = true;
	});
</script>

<!-- Star field -->
<T.Points bind:ref={starRef}>
	<T is={starGeo} />
	<T is={starMat} />
</T.Points>

<!-- Nebula drift cloud -->
<T.Points>
	<T is={nebGeo} />
	<T is={nebMat} />
</T.Points>

<!-- Atmospheric glow orbs -->
<T.Points>
	<T is={orbGeo} />
	<T is={orbMat} />
</T.Points>
