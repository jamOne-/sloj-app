<template>
  <div>
    <div class="bill" v-for="(bill, i) in bills" :key="i">
    </div>
  </div>
</template>

<script>
export default {
  props: ['bills']
}
</script>

<style scoped>
  .bill {
    width: 100%;
    height: 100px;
    border: 1px solid black;
  }
</style>
