<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import ProfessionalProjectsSection from '$lib/components/ProfessionalProjectsSection.svelte';
	import AboutMe from '$lib/components/AboutMe.svelte';
	import PublicationsSection from '$lib/components/PublicationsSection.svelte';
	import { reachableNodes } from '$lib/stores/blueprintGraph';
	import { siteMetadata } from '$lib/data/site';

	let { data } = $props();

	const SECTION_NAMES: Record<string, string> = {
		'about':        'C++',
		'professional': 'Unreal Engine',
	};

	let heroName = $state(siteMetadata.author);

	onMount(() => {
		const SECTIONS = [
			{ id: 'about',             name: 'C++'               },
			{ id: 'professional',      name: 'Unreal Engine'     },
			{ id: 'personal-projects', name: 'Have a good one!'  },
		];

		function getDocTop(el: HTMLElement) {
			return el.getBoundingClientRect().top + window.scrollY;
		}

		function update() {
			const els = SECTIONS.map(s => ({
				el: document.getElementById(s.id),
				name: s.name,
			}));

			const viewportMid = window.scrollY + window.innerHeight / 2;
			let next = siteMetadata.author;
			for (const { el, name } of els) {
				if (!el) continue;
				const sectionMid = getDocTop(el) + el.offsetHeight / 2;
				if (viewportMid >= sectionMid) next = name;
			}
			heroName = next;
		}

		window.addEventListener('scroll', update, { passive: true });
		update();
		return () => window.removeEventListener('scroll', update);
	});
</script>

<SEO />
{#if $reachableNodes.has('fn-hero')}<Hero name={heroName} />{/if}
{#if $reachableNodes.has('fn-about')}<AboutMe />{/if}
{#if $reachableNodes.has('fn-prof')}<ProfessionalProjectsSection projects={data.professionalProjects} />{/if}
{#if $reachableNodes.has('fn-pers')}<ProjectsSection projects={data.projects} title="Personal Projects" id="personal-projects" />{/if}
{#if $reachableNodes.has('fn-pub')}<PublicationsSection />{/if}
