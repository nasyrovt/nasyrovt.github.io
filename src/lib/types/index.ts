export type Theme = 'light' | 'dark' | 'strangerThings';

export interface Project {
	title: string;
	url: string;
	preview: string;
	description: string;
	image: string;
	videoUrl?: string;
	steam?: string;
	tags?: string[];
	genre?: string;
	stack?: string;
	targetAudience?: string;
	controls?: string;
	platform?: string;
	shapes: ProjectShape[];
}

export interface ProjectShape {
	type: 'circle' | 'donut';
	color: string;
	size: string[];
	xOffset: string[];
	yOffset: string[];
	opacity: number;
}

export interface ProjectFrontmatter {
	title: string;
	slug: string;
	image: string;
	genre: string;
	stack: string;
	targetAudience: string;
	controls: string;
	platform: string;
}

export interface SiteMetadata {
	title: string;
	description: string;
	siteUrl: string;
	author: string;
	github: string;
	image: string;
}
