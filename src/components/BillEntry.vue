<template>
  <div class="entry-container" :class="{ deleted: bill.deleted }">
    <div v-if="bill.deleted" class="storno">###!!!STORNO XD!!!### <small>(dominik)</small></div>
    <div class="entry">
      <span>{{ bill.from }}</span>
      <span class="arrow">&rarr;</span>
      <span>{{ bill.to }}</span>
      <span>/21.12.2018/</span>
      <span class="amount">{{ formatAmount(bill.amount) }} zł</span>
      <svg v-if="!bill.deleted" @click="bill.deleted = !bill.deleted" class="icon" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      <svg v-if="bill.deleted" @click="bill.deleted = !bill.deleted" class="icon" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bill'],
  methods: {
    formatAmount(amount) {
      return Number(amount).toFixed(2);
    }
  }
}
</script>

<style scoped>
  .entry-container.deleted .entry {
    text-decoration: line-through;
    background-color: #ecf0f1;
  }

  .storno {
    font-size: 14px;
    text-align: center;
    padding: 10px;
    background-color: #ecf0f1;
  }

  .entry {
    padding: 10px 20px;
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 24px;
    grid-column-gap: 10px;  
    align-items: center;
  }

  .arrow {
    text-align: center;
  }

  .amount {
    text-align: right;
  }

  .icon {
    fill: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  .icon:hover {
    fill: #2c3e50;
  }
</style>
