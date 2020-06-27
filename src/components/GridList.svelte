<script>
  import { Image, Pagination, Select } from './UI';
  import ColumnSettings from './ColumnSettings.svelte';
  import { columns, items } from '../stores.js';
  let listItems = $items || [];
  const pageSizes = [10, 25, 50, 100, 500];
  let pageSize = 25;
  let currentPage = 1;
  let skip = (currentPage - 1) * pageSize;
  let limit = skip + pageSize;
  let isGrid = false;

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

  function onToggle(type) {
    isGrid = type === 'grid';
  }

  function onChange(page) {
    currentPage = page;
    skip = (currentPage - 1) * pageSize;
    limit = skip + pageSize;
    listItems = [...$items.slice(skip, limit)];
  }

  function onSelect(size) {
    pageSize = size;
    skip = (currentPage - 1) * pageSize;
    limit = skip + pageSize;
    listItems = [...$items.slice(skip, limit)];
  }

  columns.subscribe(() => {
    onChange(currentPage);
  });
</script>

<div class="grid-head">
  <ColumnSettings />

  <div class="buttons">
    <div class="toggle-wrapper">
      <button
        on:click={() => onToggle('list')}
        class="btn-list"
      >list</button>
      <button
        on:click={() => onToggle('grid')}
        class="btn-grid"
      >grid</button>
    </div>

    <Select
      options={pageSizes}
      defaultValue={25}
      onChange={onSelect} />
  </div>
</div>

<div class={`grid-list ${isGrid ? 'grid' : 'list'}`}>
  {#if !isGrid}
    <div class="row">
      {#each Object.keys(listItems[0]) as key}
        {#if isVisible(key)}
          <div><strong>{key}</strong></div>
        {/if}
      {/each}
    </div>
  {/if}

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
  /* Grid Head */
  .grid-head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .grid-head .buttons {
    height: 40px;
    display: flex;
    margin-left: 30px;
  }

  .grid-head .toggle-wrapper {
    display: flex;
    margin-right: 20px;
  }

  .grid-head .toggle-wrapper button {
    border: none;
    border-radius: 0;
    line-height: 40px;
    padding: 0 20px;
    margin-bottom: 0;
  }

  .grid-head .btn-list {
    background: var(--color-primary);
    color: var(--color-white);
  }

  /* Grid List */
  .grid-list {
    display: table;
  }
  
  .row {
    margin-bottom: 3px;
    padding: 10px 20px;
    display: table-row;
  }

  .row div {
    max-width: 300px;
    display: table-cell;
    padding: 10px;
    border-bottom: 1px solid var(--color-text-light);
  }

  .row :global(img) {
    min-width: 200px;
    transition: var(--transition-all);
  }

  .row :global(img):hover {
    transform: scale(2);
    box-shadow: var(--box-shadow);
  }

  .row input {
    margin-top: 10px;
  }

  .grid-list.grid {
    display: block;
    text-align: left;
  }

  .grid-list.grid .btn-grid {
    background: var(--color-primary);
    color: var(--color-white);
  }

  .grid-list.grid .btn-list {
    background-color: var(--color-text-light);
    color: var(--color-text);
  }

  .grid-list.grid .row {
    width: 200px;
    display: inline-block;
    margin: 20px;
    vertical-align: top;
  }

  .grid-list.grid .row div {
    display: inline-block;
  }
</style>
