<template>
  <div class="card">
    <div class="header">
      <span>{{ user }}:</span> <span :class="{ green: summary.sum > 0, red: summary.sum < 0 }">{{ balance }}</span>
    </div>
    <div class="empty-entries" v-if="!summary.entries.length">
      <p>Nic tu nie ma, czysto :)</p>
    </div>
    <div class="entries" v-else>
      <div class="entry" v-for="(entry, i) in summary.entries" :key="i">
        <span>{{ entry.from }}</span> <span>&rarr;</span> <span>{{ entry.to }}</span> <span class="entry-amount" :class="{ green: entry.to == user, red: entry.from == user }">{{ entry.amount }} zł</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user', 'summary'],
  computed: {
    balance() {
      let amount = this.summary.sum;

      if (amount < 0) {
        amount = Number(-amount).toFixed(2);
        return `−${amount} zł`;
      }
      else
        return `${amount} zł`;
    }
  }
}
</script>

<style scoped>
  .card {
    width: 330px;
    margin-bottom: 30px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, .1), 0px 0px 4px rgba(0, 0, 0, .1);
  }

  .header {
    width: 100%;
    padding: 10px;
    border-bottom: 1px dashed rgba(44, 62, 80, 0.6);
    font-size: 25px;
    font-weight: 300;
    display: flex;
    justify-content: space-between;
  }

  .entries {
    padding: 10px;
  }

  .entry {
    display: grid;
    grid-template-columns: 1fr 40px 1fr 1fr;
    grid-template-rows: 100%;
    font-size: 16px;
    font-weight: 300;
  }

  .entry-amount {
    text-align: right;
  }

  .green {
    color: #1abc9c;
  }

  .red {
    color: #e67e22;
  }
  
</style>
