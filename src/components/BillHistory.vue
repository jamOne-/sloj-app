<template>
  <div class="history">
    <bill-entry v-for="bill of bills" :key="bill._id" :bill="bill" @toggleDeletion="toggleDeletion($event)"></bill-entry>
  </div>
</template>

<script>
import BillEntry from './BillEntry.vue';

export default {
  components: {
    BillEntry
  },
  props: ['bills'],
  methods: {
    toggleDeletion(bill) {
      this.$emit('toggleDeletion', bill);
    }
  }
}
</script>

<style scoped>
  .history {
    width: 700px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, .1), 0px 0px 4px rgba(0, 0, 0, .1);
    font-family: monospace;
    font-size: 18px;
  }
</style>
