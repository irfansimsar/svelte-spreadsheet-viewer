<script>
	import xlsx from 'xlsx';
	export let name;
	export let files;

	$: if (files.length) {
		console.log('*files', files)
		parseExcel(files[0]);
	}

	function printTable(data) {
		const table = document.querySelector('table');
		table.innerHTML = `
			${data.map(row => `
					<tr>${Object.keys(row).map((col, index) => `<td>${col === 'image' ? `<img src="${row[col]}" height="200" />` : row[col]}</td>`).join('')}</tr>
					`
			).join('')}
		`;
	}

	function parseExcel(file) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const data = e.target.result;
			const workbook = xlsx.read(data, {
				type: 'binary'
			});

			workbook.SheetNames.forEach(function(sheetName) {
				const rowObject = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				printTable(rowObject);
			});
		}

		reader.onerror = function(e) {
			console.error(e)
		}

		reader.readAsBinaryString(file);
	}
</script>

<main>
	<h1>{name}</h1>
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