<script>
  export let type;
  export let onClick = () => {};
</script>

<button
  class="btn btn-{type}"
  on:click={onClick}
  {...$$restProps}>
  <slot></slot>
</button>

<style>
  .btn {
    background: var(--color-primary);
    border: none;
    border-radius: 4px;
    color: var(--color-white);
    cursor: pointer;
    padding: 10px 20px;
  }

  .btn:hover {
    opacity: .8;
  }

  .btn-secondary {
    background: var(--color-secondary);
  }

  .btn-plain {
    background: var(--color-text);
  }
</style>