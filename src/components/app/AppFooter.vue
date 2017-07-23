<template>
  <footer>
    <div class="container">
      <div class="footer">
        <div class="author">
          <p>by <a href="https://github.com/jamone-">@jamone-</a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
  footer {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
  }

  .footer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.16);
  }

  a {
    text-decoration: none;
  }

  a:visited {
    color: inherit;
  }
</style>
