import { writable } from 'svelte/store';

/** Current blueprint panel width in vw percent (0 = closed). */
export const blueprintPanelWidth = writable(0);

/** True while the user is actively dragging the resize handle. */
export const blueprintResizing = writable(false);
