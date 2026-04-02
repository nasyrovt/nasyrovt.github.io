import yaml from 'yaml';
import type { Project } from '$lib/types';
import projectsRaw from '$lib/data/projects.yaml?raw';
import professionalRaw from '$lib/data/professional-projects.yaml?raw';

export function load() {
	const projects: Project[] = yaml.parse(projectsRaw);
	const professionalProjects: Project[] = yaml.parse(professionalRaw) ?? [];
	return { projects, professionalProjects };
}
