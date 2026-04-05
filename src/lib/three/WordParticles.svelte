<script lang="ts">
	import { useThrelte, useTask } from '@threlte/core';
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';

	const { scene } = useThrelte();

	// ─── Config ────────────────────────────────────────────────────────────────
	const PER_TYPE  = 100;          // instances per geometry type
	const MESH_DEFS = [
		{ geo: new THREE.IcosahedronGeometry(0.11, 0)         },
		{ geo: new THREE.OctahedronGeometry(0.10, 0)          },
		{ geo: new THREE.DodecahedronGeometry(0.09, 0)        },
		{ geo: new THREE.TorusGeometry(0.08, 0.025, 5, 7)     },
	];
	const COUNT = PER_TYPE * MESH_DEFS.length; // 400

	const T_FORM    = 1.2;
	const T_HOLD    = 5.0;
	const T_SCATTER = 0.8;

	const WORDS: { text: string; fontSize: number }[] = [
		{ text: 'Unreal Engine', fontSize: 54  },
		{ text: 'C++',           fontSize: 110 },
	];
	const CVS_W = 640, CVS_H = 160;
	const Y_OFFSET = -1.8; // shift words below hero name

	// ─── Shared wireframe material ─────────────────────────────────────────────
	const mat = new THREE.MeshBasicMaterial({ wireframe: true, color: '#81e6d9' });

	// ─── InstancedMeshes ───────────────────────────────────────────────────────
	const meshes = MESH_DEFS.map(({ geo }) => {
		const m = new THREE.InstancedMesh(geo, mat, PER_TYPE);
		m.frustumCulled = false;
		return m;
	});

	// ─── Per-instance buffers ──────────────────────────────────────────────────
	const cur   = new Float32Array(COUNT * 3); // current world positions
	const tgt   = new Float32Array(COUNT * 3); // target positions
	const sdst  = new Float32Array(COUNT * 3); // scatter destinations
	const rot   = new Float32Array(COUNT * 3); // euler angles (x,y,z)
	const rspd  = new Float32Array(COUNT * 3); // spin speed per axis

	for (let i = 0; i < COUNT; i++) {
		// Nearby scatter — not too far from text area
		sdst[i*3]     = (Math.random() - 0.5) * 12;
		sdst[i*3 + 1] = (Math.random() - 0.5) * 6 + Y_OFFSET;
		sdst[i*3 + 2] = (Math.random() - 0.5) * 3 - 1;

		rot[i*3]     = Math.random() * Math.PI * 2;
		rot[i*3 + 1] = Math.random() * Math.PI * 2;
		rot[i*3 + 2] = Math.random() * Math.PI * 2;

		const spd    = 0.5 + Math.random() * 1.5;
		rspd[i*3]     = (Math.random() - 0.5) * spd;
		rspd[i*3 + 1] = (Math.random() - 0.5) * spd;
		rspd[i*3 + 2] = (Math.random() - 0.5) * spd * 0.4;
	}

	cur.set(sdst);
	tgt.set(sdst);

	// ─── Text sampling ─────────────────────────────────────────────────────────
	let wordTargets: Float32Array[] = [];

	function sampleWord(text: string, fontSize: number): Float32Array {
		const cvs = document.createElement('canvas');
		cvs.width = CVS_W; cvs.height = CVS_H;
		const ctx = cvs.getContext('2d')!;

		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, CVS_W, CVS_H);
		ctx.fillStyle = '#fff';
		ctx.font = `bold ${fontSize}px "IBM Plex Sans", Arial, sans-serif`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(text, CVS_W / 2, CVS_H / 2);

		const data = ctx.getImageData(0, 0, CVS_W, CVS_H).data;
		const pts: number[] = [];
		const step = 4;

		for (let y = 0; y < CVS_H; y += step) {
			for (let x = 0; x < CVS_W; x += step) {
				if (data[(y * CVS_W + x) * 4] > 100) {
					pts.push(
						(x / CVS_W - 0.5) * 10,
						-(y / CVS_H - 0.5) * 2.6 + Y_OFFSET,
						(Math.random() - 0.5) * 0.3
					);
				}
			}
		}

		// Shuffle so shapes swarm in from all directions
		for (let i = Math.floor(pts.length / 3) - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const a = i * 3, b = j * 3;
			[pts[a],     pts[b]]     = [pts[b],     pts[a]];
			[pts[a + 1], pts[b + 1]] = [pts[b + 1], pts[a + 1]];
			[pts[a + 2], pts[b + 2]] = [pts[b + 2], pts[a + 2]];
		}

		const out = new Float32Array(COUNT * 3);
		const n   = Math.min(Math.floor(pts.length / 3), COUNT);
		for (let i = 0; i < n * 3; i++) out[i] = pts[i];
		// spare shapes park at scatter positions
		for (let i = n; i < COUNT; i++) {
			out[i*3]     = sdst[i*3];
			out[i*3 + 1] = sdst[i*3 + 1];
			out[i*3 + 2] = sdst[i*3 + 2];
		}
		return out;
	}

	// ─── Scene integration ─────────────────────────────────────────────────────
	$effect(() => {
		meshes.forEach(m => scene.add(m));
		return () => {
			meshes.forEach(m => { scene.remove(m); m.dispose(); });
			MESH_DEFS.forEach(({ geo }) => geo.dispose());
			mat.dispose();
		};
	});

	// Update wireframe colour when theme changes
	$effect(() => {
		mat.color.set(
			$theme === 'strangerThings' ? '#fc8181' :
			$theme === 'dark'           ? '#81e6d9' :
			                              '#667eea'
		);
	});

	// ─── Phase state ───────────────────────────────────────────────────────────
	type Phase = 'scatter' | 'forming' | 'hold';
	let phase: Phase = 'scatter';
	let timer  = 0;
	let wIdx   = 0;
	let ready  = false;

	onMount(() => {
		document.fonts.ready.then(() => {
			wordTargets = WORDS.map(({ text, fontSize }) => sampleWord(text, fontSize));
			ready = true;
			phase = 'forming';
			timer = 0;
			tgt.set(wordTargets[0]);
		});
	});

	// ─── Animation loop ────────────────────────────────────────────────────────
	const dummy = new THREE.Object3D();

	function lerpSpeed(p: Phase) {
		return p === 'forming' ? 1.1 : p === 'scatter' ? 1.4 : 0.2;
	}

	useTask((delta) => {
		if (!ready) return;

		timer += delta;

		if (phase === 'forming' && timer > T_FORM) {
			phase = 'hold'; timer = 0;
		} else if (phase === 'hold' && timer > T_HOLD) {
			phase = 'scatter'; timer = 0;
			tgt.set(sdst);
		} else if (phase === 'scatter' && timer > T_SCATTER) {
			wIdx  = (wIdx + 1) % wordTargets.length;
			phase = 'forming'; timer = 0;
			tgt.set(wordTargets[wIdx]);
		}

		const ls = lerpSpeed(phase);
		// Spin freely while scattered; slow to a near-stop while forming the word
		const spinMult =
			phase === 'scatter' ? 1.0 :
			phase === 'forming' ? 0.12 :
			                      0.04;

		for (let i = 0; i < COUNT; i++) {
			const x = i * 3, y = x + 1, z = x + 2;

			cur[x] += (tgt[x] - cur[x]) * delta * ls;
			cur[y] += (tgt[y] - cur[y]) * delta * ls;
			cur[z] += (tgt[z] - cur[z]) * delta * ls;

			rot[x] += rspd[x] * delta * spinMult;
			rot[y] += rspd[y] * delta * spinMult;
			rot[z] += rspd[z] * delta * spinMult;

			dummy.position.set(cur[x], cur[y], cur[z]);
			dummy.rotation.set(rot[x], rot[y], rot[z]);
			dummy.updateMatrix();

			meshes[Math.floor(i / PER_TYPE)].setMatrixAt(i % PER_TYPE, dummy.matrix);
		}

		meshes.forEach(m => { m.instanceMatrix.needsUpdate = true; });
	});
</script>
