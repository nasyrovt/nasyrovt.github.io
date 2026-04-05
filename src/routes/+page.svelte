<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import ProfessionalProjectsSection from '$lib/components/ProfessionalProjectsSection.svelte';
	import AboutMe from '$lib/components/AboutMe.svelte';
	import PublicationsSection from '$lib/components/PublicationsSection.svelte';
	import { reachableNodes } from '$lib/stores/blueprintGraph';

	let { data } = $props();
</script>

<SEO />
{#if $reachableNodes.has('fn-hero')}<Hero />{/if}
{#if $reachableNodes.has('fn-about')}<AboutMe />{/if}
{#if $reachableNodes.has('fn-prof')}<ProfessionalProjectsSection projects={data.professionalProjects} />{/if}
{#if $reachableNodes.has('fn-pers')}<ProjectsSection projects={data.projects} title="Personal Projects" id="personal-projects" />{/if}
{#if $reachableNodes.has('fn-pub')}<PublicationsSection />{/if}
