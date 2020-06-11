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

  columns.subscribe(value => {
    data = [...data]
  })
</script>

<div>
  <pre>{JSON.stringify($columns)}</pre>
  {#each data as item}
    <div class="row">
      {#each Object.keys(item) as key}
        {#if isVisible(key)}
          {#if isImage(key)}
            <span><Image src={item[key]} /></span>
          {:else}
            <span>{item[key]}</span>
          {/if}
        {/if}
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: table-row;
  }
  .row span {
    width: 20%;
    display: inline-block;
    padding: 5px;
  }
</style>