<template>
  <div>
    <div class="summaries">
      <summary-card v-for="(summary, user) in summaries"
        :key="user"
        :user="user"
        :summary="summary">
      </summary-card>
    </div>

    <div class="new-bill-container">
      <new-bill @addBill="addBill($event)"></new-bill>
    </div>

    <!--<div class="history-container">
      <bill-history :bills="bills"></bill-history>
    </div>-->
  </div>
</template>

<script>
import SummaryCard from '../SummaryCard.vue';
import NewBill from '../NewBill.vue';
import BillHistory from '../BillHistory.vue';

export default {
  components: {
    SummaryCard,
    NewBill,
    BillHistory
  },
  data() {
    return {
      bills: [
        {
          comment: 'Za jakieś duperele',
          entries: [{ from: 'Werner', to: 'Dominik', amount: 12 }, { from: 'Werner', to: 'Rafał', amount: 17.82 }, { from: 'Dominik', to: 'Rafał', amount: 3 }]
        }, {
          comment: 'Dominik dłużnik',
          entries: [{ from: 'Dominik', to: 'Rafał', amount: 19.90 }, { from: 'Dominik', to: 'Werner', amount: 10 }]
        }
      ]
    };
  },
  computed: {
    summaries() {
      const summaries = this.getSummaries();
      const printableSummaries = {};
      const formatNumber = n => Number(n).toFixed(2);

      for (const from in summaries) {
        printableSummaries[from] = { sum: formatNumber(summaries[from]._sum) };
        const entries = [];

        for (const to in summaries[from]) {
          if (to == '_sum') continue;

          const amount = summaries[from][to];

          if (amount < 0)
            entries.push({ from: to, to: from, amount: formatNumber(-amount) });
          else if (amount > 0)
            entries.push({ from, to, amount: formatNumber(amount) });
        }

        printableSummaries[from].entries = entries;
      }

      return printableSummaries;
    }
  },
  methods: {
    addBill(bill) {
      this.bills.push(bill);
    },

    getSummaries() {
      const summaries = {};

      this.bills.forEach(bill => {
        bill.entries.forEach(entry => {
          summaries[entry.from] = summaries[entry.from] || { _sum: 0 };
          summaries[entry.from][entry.to] = summaries[entry.from][entry.to] || 0;
          summaries[entry.to] = summaries[entry.to] || { _sum: 0 };
          summaries[entry.to][entry.from] = summaries[entry.to][entry.from] || 0;

          summaries[entry.from][entry.to] += entry.amount;
          summaries[entry.from]._sum -= entry.amount;
          summaries[entry.to][entry.from] -= entry.amount;
          summaries[entry.to]._sum += entry.amount;
        });
      });

      return summaries;
    }
  }
}
</script>

<style>
  .summaries {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .new-bill-container {
    padding: 20px 0;
    display: flex;
    justify-content: center;
  }
</style>
