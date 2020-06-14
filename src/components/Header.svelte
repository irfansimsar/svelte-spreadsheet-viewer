<script>
	import xlsx from 'xlsx';
	import { items, reset } from '../stores.js';
	import { Button } from './UI';

	function exportFile() {
		const ws = xlsx.utils.json_to_sheet($items);
		const wb = xlsx.utils.book_new();
		xlsx.utils.book_append_sheet(wb, ws, "Spreadsheet Viewer");
		xlsx.writeFile(wb, "svelte-spreadsheet.xlsx");
	}
</script>

<header class={$items.length ? 'with-menu' : ''}>
  <h1>Spreadsheet Viewer</h1>

  <div class="menu">
    <Button onClick={reset}>Reset</Button>
    <Button type="secondary" onClick={exportFile}>Export</Button>
  </div>
</header>

<style>
  header {
    padding: 30px 0;
  }

  h1 {
		color: var(--color-primary);
		text-transform: uppercase;
		font-size: 4em;
    font-weight: 100;
    margin: 0;
  }
  
  .menu {
    display: none;
  }

  .with-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .with-menu .menu {
    display: block;
  }

  .with-menu :global(.btn) {
    margin-bottom: 0;
  }
</style>
