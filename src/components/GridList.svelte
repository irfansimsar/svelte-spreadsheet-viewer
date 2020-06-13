<script>
	import { Image, Pagination } from './UI';
	import { columns, items } from '../stores.js';
	const pageSize = 10;
	let listItems = $items || [];
	let currentPage = 1;
	
	function isImage(key) {
		const column = $columns.find(col => col.id === key);
		return column && column.isImage;
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

{#each listItems as item}
	<div class="row">
		{#each Object.keys(item) as key}
			{#if isVisible(key)}
				{#if isImage(key)}
					<div><Image src={item[key]} /></div>
				{:else}
					<div>{item[key]}</div>
				{/if}
			{/if}
		{/each}
	</div>
{/each}

<Pagination
	pageSize={pageSize}
	total={$items.length}
	onChange={onChange}
/>

<style>
  .row {
		border-bottom: 1px solid var(--color-text-light);
		margin-bottom: 3px;
		padding: 10px 20px;
		display: flex;
		align-items: center;
  }
  .row div {
		flex-grow: 1;
		flex-basis: 0;
	}
</style>
