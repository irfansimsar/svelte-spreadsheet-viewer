<script>
  import xlsx from 'xlsx';
  import Header from './components/Header.svelte';
  import GridList from './components/GridList.svelte';
  import { columns, items } from './stores.js';
  export let files;

  $: if (files.length) {
    parseExcel(files[0]);
  }

  function parseExcel(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const result = e.target.result;
      const workbook = xlsx.read(result, {
        type: 'binary'
      });

      workbook.SheetNames.forEach((sheetName) => {
        const rowObject = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        const keys = Object.keys(rowObject[0]).map(col => {
          return {
            id: col,
            isVisible: true,
            isEditable: false,
            isImage: false
          };
        });
        columns.set(keys);
        items.set(rowObject);
      });
    };

    reader.onerror = function(e) {
      console.error(e);
    };

    reader.readAsBinaryString(file);
  }
</script>

<main>
  <Header />

  {#if !$items.length}
    <div class="drop-area">
      Upload your spreadsheet file!
      <input
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        bind:files>
    </div>
  {:else}
    <GridList />
  {/if}
</main>

<style>
  main {
    width: 100%;
    text-align: center;
    padding: 20px 40px;
    margin: 0 auto;
  }

  .drop-area {
    border: 2px dashed var(--color-text-light);
    display: inline-block;
    padding: 50px;
  }

  .drop-area input {
    display: block;
    margin-top: 20px;
  }
</style>