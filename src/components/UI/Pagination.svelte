<script>
  import { afterUpdate } from 'svelte';
  export let current = 1;
  export let pageSize = 20;
  export let total = 20;
  export let onChange = () => {};
  let pages = [...Array(Math.ceil(total / pageSize)).keys()];

  const handleOnChange = (page) => {
    current = page;
    onChange(page);
  };

  afterUpdate(() => {
    pages = [...Array(Math.ceil(total / pageSize)).keys()];
  });
</script>

<div class="pagination">
  {#each pages as page}
    <button
      class:current={current === page + 1}
      on:click={() => handleOnChange(page + 1)}>
        {page + 1}
      </button>
  {/each}
</div>

<style>
  .pagination {
    margin: 20px 0;
  }

  .pagination button {
    width: 40px;
    height: 40px;
    transition: var(--transition-all);
    margin: 0 2px;
  }

  .pagination button:hover,
  .pagination button.current {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
    opacity: .8;
  }

  .pagination button.current {
    opacity: 1;
  }
</style>