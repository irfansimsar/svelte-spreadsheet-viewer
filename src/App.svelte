<script>
	export let name;
	export let files;

	$: if (files.length) {
		console.log('*files', files)
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
		<p><strong>{files[0].name}</strong> is uploaded and its size is <strong>{files[0].size}</strong> bytes</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>