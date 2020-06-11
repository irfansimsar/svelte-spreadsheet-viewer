import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Spreadsheet Viewer',
		files: [],
		columns: []
	}
});

export default app;