import { writable, derived } from 'svelte/store';

export interface Connection {
	id: string;
	fromNode: string;
	fromPin: string;
	toNode: string;
	toPin: string;
}

export const initialConnections: Connection[] = [
	{ id: 'c1', fromNode: 'event-tick', fromPin: 'exec-out-0', toNode: 'fn-hero',  toPin: 'exec-in' },
	{ id: 'c2', fromNode: 'fn-hero',    fromPin: 'exec-out-0', toNode: 'fn-prof',  toPin: 'exec-in' },
	{ id: 'c3', fromNode: 'fn-prof',    fromPin: 'exec-out-0', toNode: 'fn-pers',  toPin: 'exec-in' },
	{ id: 'c4', fromNode: 'fn-pers',    fromPin: 'exec-out-0', toNode: 'fn-about', toPin: 'exec-in' },
	{ id: 'c5', fromNode: 'fn-about',   fromPin: 'exec-out-0', toNode: 'fn-pub',   toPin: 'exec-in' },
];

export const connectionsStore = writable<Connection[]>(initialConnections);

/** Set of node IDs reachable from 'event-tick' via the current connection graph. */
export const reachableNodes = derived(connectionsStore, ($conns) => {
	const reachable = new Set<string>();
	const queue = ['event-tick'];
	reachable.add('event-tick');
	while (queue.length > 0) {
		const nodeId = queue.shift()!;
		for (const c of $conns) {
			if (c.fromNode === nodeId && !reachable.has(c.toNode)) {
				reachable.add(c.toNode);
				queue.push(c.toNode);
			}
		}
	}
	return reachable;
});
