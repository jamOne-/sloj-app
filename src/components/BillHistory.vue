<template>
  <div>
    <bill class="bill" v-for="(bill, i) in bills" :key="i" :bill="bill"></bill>
  </div>
</template>

<script>
import Bill from './Bill.vue'

export default {
  props: ['bills'],
  components: {
    Bill
  }
}
</script>

<style scoped>
</style>
