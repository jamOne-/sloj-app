<template>
  <main>
    <div class="container">
      <div class="summary">
        <summary-card></summary-card>
        <summary-card></summary-card>
        <summary-card></summary-card>
      </div>

      <div class="history-wrapper">
        <bill-history></bill-history>
      </div>
    </div>
  </main>
</template>

<script>
import SummaryCard from './SummaryCard.vue';

export default {
  components: {
    SummaryCard
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
