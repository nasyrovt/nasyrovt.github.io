import { writable } from 'svelte/store';
import type { Theme } from '$lib/types';

const THEMES: Theme[] = ['light', 'dark'];
const STORAGE_KEY = 'portfolio-theme';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');

	function applyTheme(theme: Theme) {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem(STORAGE_KEY, theme);
		}
	}

	return {
		subscribe,
		set(theme: Theme) {
			set(theme);
			applyTheme(theme);
		},
		cycle() {
			update((current) => {
				const idx = THEMES.indexOf(current);
				const next = THEMES[(idx + 1) % THEMES.length];
				applyTheme(next);
				return next;
			});
		},
		init() {
			if (typeof window === 'undefined') return;

			const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
			if (stored && THEMES.includes(stored)) {
				set(stored);
				applyTheme(stored);
				return;
			}

			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const initial: Theme = prefersDark ? 'dark' : 'light';
			set(initial);
			applyTheme(initial);
		}
	};
}

export const theme = createThemeStore();
