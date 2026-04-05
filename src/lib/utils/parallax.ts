/**
 * Parallax Svelte action.
 *
 * Apply to an element whose parent section stays in normal document flow.
 * The element itself will be translated vertically at `speed` rate relative
 * to the scroll distance the section has traveled through the viewport.
 *
 *   speed = 0   → moves with scroll (no effect)
 *   speed = 0.1 → moves at 10% of the distance from viewport centre
 *
 * Usage:
 *   <div use:parallax>…</div>
 *   <div use:parallax={{ speed: 0.15 }}>…</div>
 */
export function parallax(
	node: HTMLElement,
	{ speed = 0.1 }: { speed?: number } = {}
) {
	let ticking = false;

	function update() {
		// Distance of the node's vertical center from the viewport's center.
		// This is recomputed every rAF so we don't cache stale values.
		const rect  = node.getBoundingClientRect();
		const vh    = window.innerHeight;
		const delta = (rect.top + rect.height / 2) - vh / 2;
		node.style.transform = `translateY(${delta * speed}px)`;
		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			requestAnimationFrame(update);
			ticking = true;
		}
	}

	// Set initial position without waiting for first scroll event
	update();

	window.addEventListener('scroll', onScroll, { passive: true });

	return {
		update({ speed: newSpeed = 0.1 }: { speed?: number } = {}) {
			speed = newSpeed;
			update();
		},
		destroy() {
			window.removeEventListener('scroll', onScroll);
			node.style.transform = '';
		},
	};
}
