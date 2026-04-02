import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function scrollReveal(
	node: HTMLElement,
	params: {
		y?: number;
		x?: number;
		duration?: number;
		delay?: number;
		stagger?: number;
		start?: string;
		children?: boolean;
	} = {}
) {
	const {
		y = 40,
		x = 0,
		duration = 0.8,
		delay = 0,
		stagger = 0,
		start = 'top 85%',
		children = false
	} = params;

	const targets = children ? node.children : node;

	gsap.set(targets, { opacity: 0, y, x });

	const tween = gsap.to(targets, {
		opacity: 1,
		y: 0,
		x: 0,
		duration,
		delay,
		stagger,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: node,
			start,
			toggleActions: 'play none none none'
		}
	});

	return {
		destroy() {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}
