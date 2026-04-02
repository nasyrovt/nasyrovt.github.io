<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import BlueprintSection from '$lib/components/BlueprintSection.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import AboutMe from '$lib/components/AboutMe.svelte';

	let { data } = $props();
</script>

<SEO />
<Hero />
<BlueprintSection />
<ProjectsSection projects={data.professionalProjects} title="Professional Projects" id="professional-projects" accent="indigo" first />
<ProjectsSection projects={data.projects} title="Personal Projects" id="personal-projects" accent="teal" />
<AboutMe />
