<script>
	import { Image } from './UI';
	import { columns } from '../stores.js';
	export let data;

	function isImage(key) {
		const column = $columns.find(col => col.id === key);
		return column && column.isImage;
	}

	function isVisible(key) {
		const column = $columns.find(col => col.id === key);
		return column && column.isVisible;
	}

	columns.subscribe(() => {
		data = [...data];
	});
</script>

{#each data as item}
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
