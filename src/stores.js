import { writable } from 'svelte/store';

const STORE_PREFIX = 'svltxls_';

// Columns Store
const columnsData = localStorage.getItem(`${STORE_PREFIX}columns`);

export const columns = writable(JSON.parse(columnsData) || []);

columns.subscribe(value => {
  if (columnsData !== value) {
    localStorage.setItem(`${STORE_PREFIX}columns`, JSON.stringify(value));
  }
});

// Items Store
const itemsData = localStorage.getItem(`${STORE_PREFIX}items`);

export const items = writable(JSON.parse(itemsData) || []);

items.subscribe(value => {
  if (itemsData !== value) {
    localStorage.setItem(`${STORE_PREFIX}items`, JSON.stringify(value));
  }
});

// Reset Storeage
export const reset = () => {
  columns.set([]);
  items.set([]);
};