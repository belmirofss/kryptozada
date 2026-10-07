import { writable } from 'svelte/store';

/** Text typed in the header search; the market list filters by it. */
export const searchText = writable('');
