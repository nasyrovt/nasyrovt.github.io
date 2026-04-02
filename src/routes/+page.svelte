<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import AboutMe from '$lib/components/AboutMe.svelte';

	let { data } = $props();
</script>

<SEO />
<Hero />
<ProjectsSection projects={data.professionalProjects} title="Professional Projects" id="professional-projects" first />
<ProjectsSection projects={data.projects} title="Personal Projects" id="personal-projects" />
<AboutMe />
