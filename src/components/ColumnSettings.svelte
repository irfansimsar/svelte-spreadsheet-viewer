<script>
  import { columns } from '../stores.js';
</script>

<div class="column-settings">
  {#each $columns as column}
    <div class="column">
      <h3>{column.id}</h3>
      <label>visible <input type="checkbox" bind:checked={column.isVisible} /></label>
      <label>editable <input type="checkbox" bind:checked={column.isEditable} /></label>
      <label>image <input type="checkbox" bind:checked={column.isImage} /></label>
    </div>
  {/each}
</div>

<style>
  .column {
    font-size: 12px;
    box-shadow: var(--box-shadow-light);
    margin: 10px;
    padding: 10px;
    display: inline-block;
    text-align: right;
  }

  .column h3 {
    margin: 0 0 10px;
  }
</style>
