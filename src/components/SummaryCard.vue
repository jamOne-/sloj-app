<template>
  <div class="card">
    <div class="header">
    </div>
    <div class="content">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: 'User',
      balance: 123.45
    };
  }
}
</script>

<style scoped>
  .card {
    width: 300px;
    border: 3px solid black;
  }

  .header {
    width: 100%;
    height: 200px;
    border-bottom: 5px dashed black;
  }

  .content {
    width: 100%;
    height: 100px;
  }
  
</style>
