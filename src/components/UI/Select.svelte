<script>
  export let options;
  export let defaultValue;
  export let onChange = () => {};
  let selectedValue = defaultValue;

  const handleOnChange = () => {
    onChange(selectedValue);
  };
</script>

<label class="select">
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    bind:value={selectedValue}
    on:change={() => handleOnChange()}>
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
</label>

<style>
  .select {
    position: relative;
  }

  .select select {
    background-color: #fefefe;
    display: block;
    width: 100%;
    min-width: 80px;
    cursor: pointer;
    margin-bottom: 0;
    padding: 0 0 0 10px;
    outline: none;
    border: 1px solid var(--color-text-light);
    -webkit-appearance: none;
    -moz-appearance: none;
    line-height: 38px;
    color: var(--color-text);
    font-size: 16px;
  }

  .select:after {
    content: "";
    width: 0; 
    height: 0; 
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--color-primary);
    margin-top: -3px;
    z-index: 5;
    position: absolute;
    right: 8px;
    top: 50%;
  }
</style>
