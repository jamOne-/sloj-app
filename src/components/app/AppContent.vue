<template>
  <main>
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import MainPage from '../pages/MainPage.vue';

export default {
  components: {
    MainPage
  }
}
</script>

<style scoped>
  main {
    width: 100%;
    min-height: calc(100vh - 80px - 60px);
    display: flex;
    justify-content: center;
    padding: 40px 0;
  }

  .summary {
    display: flex;
    justify-content: space-between;
  }
</style>
