import type { EntryGenerator } from './$types';

const projectModules = import.meta.glob('/src/lib/data/projects/*.md', { eager: true });

export const entries: EntryGenerator = () => {
	return Object.keys(projectModules).map((path) => {
		const slug = path.split('/').pop()!.replace('.md', '');
		return { slug };
	});
};

export function load({ params }: { params: { slug: string } }) {
	const path = `/src/lib/data/projects/${params.slug}.md`;
	const module = projectModules[path] as {
		default: ConstructorOfATypedSvelteComponent;
		metadata: Record<string, string>;
	};

	if (!module) {
		throw new Error(`Project not found: ${params.slug}`);
	}

	return {
		content: module.default,
		metadata: module.metadata
	};
}
