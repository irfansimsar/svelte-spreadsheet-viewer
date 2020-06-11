<script>
  import { columns } from '../stores.js';
</script>

<div class="column-settings">
  {#each $columns as column}
    <div class="column">
      <h3>{column.id}</h3>
      <label>Is Visible <input type="checkbox" bind:checked={column.isVisible} /></label>
      <label>Is Image <input type="checkbox" bind:checked={column.isImage} /></label>
    </div>
	{/each}
</div>

<style>
  .column {
    font-size: 12px;
    box-shadow: 0px 0px 5px 0px rgba(168,168,168,0.5);
    margin: 5px;
    padding: 10px;
    display: inline-block;
  }

  .column h3 {
    margin: 0 0 10px;
  }
</style>
