<script>
	import { items, reset } from '../stores.js';
	import { Button } from './UI';

</script>

<header class={$items.length ? 'with-menu' : ''}>
  <h1>Spreadsheet Viewer</h1>

  <div class="menu">
    <Button onClick={reset}>Reset</Button>
  </div>
</header>

<style>
  header {
    padding: 30px 0;
  }

  h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
    font-weight: 100;
    margin: 0;
  }
  
  .menu {
    display: none;
  }

  .with-menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .with-menu .menu {
    display: block;
  }

  .with-menu :global(.btn) {
    margin-bottom: 0;
  }
</style>
