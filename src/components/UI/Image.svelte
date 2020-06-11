<script>
  export let alt;
</script>

<img loading="lazy" {...$$restProps} alt={alt} />

<style>
  img {
    display: inline-block;
    max-width: 100%;
  }
</style>
