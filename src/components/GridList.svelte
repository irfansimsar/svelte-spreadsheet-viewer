<script>
	import { Image, Pagination } from './UI';
	import { columns, items } from '../stores.js';
	let listItems = $items || [];
	const pageSize = 10;
	let currentPage = 1;

	function isImage(key) {
		const column = $columns.find(col => col.id === key);
		return column && column.isImage;
	}
	
	function isEditable(key) {
		const column = $columns.find(col => col.id === key);
		return column && column.isEditable;
	}

	function isVisible(key) {
		const column = $columns.find(col => col.id === key);
		return column && column.isVisible;
	}

	function onChange(page) {
		currentPage = page;
		const skip = (currentPage - 1) * pageSize;
		const limit = skip + pageSize;
		listItems = [...$items.slice(skip, limit)];
	}

	columns.subscribe(() => {
		const skip = (currentPage - 1) * pageSize;
		const limit = skip + pageSize;
		listItems = [...$items.slice(skip, limit)];
	});
</script>

<div class="grid-list">
	<div class="row">
		{#each Object.keys(listItems[0]) as key}
			<div><strong>{key}</strong></div>
		{/each}
	</div>

	{#each listItems as item}
		<div class="row">
			{#each Object.keys(item) as key}
				{#if isVisible(key)}
					<div>
						{#if isImage(key)}
							<a href={item[key]} target="_blank">
								<Image src={item[key]} />
							</a>
						{:else}
							{item[key]}
						{/if}
						{#if isEditable(key)}
							<input bind:value={item[key]} />
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<Pagination
	pageSize={pageSize}
	total={$items.length}
	onChange={onChange}
/>

<style>
	.grid-list {
		display: table;
	}

  .row {
		margin-bottom: 3px;
		padding: 10px 20px;
		display: table-row;
		/* display: flex;
		flex-flow: row wrap;
		align-items: center; */
	}

  .row div {
		max-width: 300px;
		display: table-cell;
		padding: 10px;
		border-bottom: 1px solid var(--color-text-light);
		/* flex-grow: 1;
		flex-basis: 0; */
	}

	.row :global(img) {
		min-width: 200px;
		transition: .3s ease all;
	}

	.row :global(img):hover {
		transform: scale(2);
		box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.5);
	}
</style>
