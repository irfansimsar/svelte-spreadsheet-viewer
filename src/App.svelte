<script>
	import xlsx from 'xlsx';
	import ColumnSettings from './components/ColumnSettings.svelte';
	import { columns } from './stores.js';
	export let name;
	export let files;

	$: if (files.length) {
		parseExcel(files[0]);
	}

	function printTable(data) {
		const table = document.querySelector('table');
		table.innerHTML = `
			${data.map(row => `
					<tr>${Object.keys(row).map((col) => `<td>${col === 'image' ? `<img src="${row[col]}" height="200" />` : row[col]}</td>`).join('')}</tr>
			`).join('')}
		`;
	}

	function parseExcel(file) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const result = e.target.result;
			const workbook = xlsx.read(result, {
				type: 'binary'
			});

			workbook.SheetNames.forEach((sheetName) => {
				const rowObject = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				const keys = Object.keys(rowObject[0]).map(col => {
					return {
						id: col,
						isVisible: true,
						isImage: false
					};
				});
				printTable(rowObject);
				columns.set(keys);
			});
		};

		reader.onerror = function(e) {
			console.error(e);
		};

		reader.readAsBinaryString(file);
	}
</script>

<main>
	<h1>{name}</h1>

	<ColumnSettings />

	{#if !files.length}
		<div class="drop-area">
			Upload your spreadsheet file!
			<input
				type="file"
				accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				bind:files>
		</div>
	{:else}
		<table></table>
	{/if}
</main>

<style>
	main {
		width: 100%;
		text-align: center;
		padding: 1em;
		max-width: 660px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.drop-area {
		border: 2px dashed #ddd;
		display: inline-block;
		padding: 50px;
	}

	.drop-area input {
		display: block;
		margin-top: 20px;
	}
</style>