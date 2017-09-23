<template>
  <div>
    <div class="loader--container" v-if="busy">
      <loader></loader>
    </div>

    <transition name="fade">
      <div v-if="!busy">
        <div class="summaries">
          <summary-card v-for="item in summariesList"
            :key="item.user"
            :user="item.user"
            :summary="item.summary">
          </summary-card>
        </div>

        <div class="new-bill-container">
          <new-bill @addBill="addBill($event)" :possibleFroms="possibleFroms" :possibleTos="possibleTos"></new-bill> 
        </div>

        <div class="history-container">
          <bill-history :bills="bills" @toggleDeletion="toggleDeletion($event)"></bill-history> 
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SummaryCard from '../SummaryCard.vue';
import NewBill from '../NewBill.vue';
import BillHistory from '../BillHistory.vue';
import Loader from '../Loader.vue';
import axios from 'axios';

export default {
  components: {
    SummaryCard,
    NewBill,
    BillHistory,
    Loader
  },
  data() {
    return {
      bills: [],
      possibleFroms: [],
      possibleTos: [],
      groups: {},
      busy: true
    };
  },
  async created() {
    const delayPromise = delay => new Promise((resolve, reject) => {
      setTimeout(resolve, delay);
    });

    [this.bills, {
        possibleFroms: this.possibleFroms,
        possibleTos: this.possibleTos,
        groups: this.groups
    }] = await Promise.all([
      axios.get('/api/bills').then(response => response.data),
      axios.get('/api/groups').then(response => response.data),
      delayPromise(500)
    ]);
    
    this.busy = false;
  },
  computed: {
    summariesList() {
      const users = ['Rafał', 'Dominik', 'Werner'];
      const summaries = this.summaries;

      return users
        .map(user => ({ user, summary: summaries[user] }))
        .filter(({ user, summary }) => summary);
    },
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
    async addBill(bill) {
      const newBill = await axios.post('/api/bills', bill).then(response => response.data);
      this.bills.unshift(newBill);
    },

    getSummaries() {
      const summaries = {};
      const calculateEntry = entry => {
        summaries[entry.from] = summaries[entry.from] || { _sum: 0 };
        summaries[entry.from][entry.to] = summaries[entry.from][entry.to] || 0;
        summaries[entry.to] = summaries[entry.to] || { _sum: 0 };
        summaries[entry.to][entry.from] = summaries[entry.to][entry.from] || 0;

        summaries[entry.from][entry.to] += entry.amount;
        summaries[entry.from]._sum -= entry.amount;
        summaries[entry.to][entry.from] -= entry.amount;
        summaries[entry.to]._sum += entry.amount;
      };

      this.bills.forEach(entry => {
        if (entry.deleted) return;

        const to_user = this.groups[entry.to].users[0];
        const users = this.groups[entry.from].users;
        const entries = users.map(from_user => ({
          from: from_user,
          to: to_user,
          amount: entry.amount / users.length
        }));

        entries.forEach(calculateEntry);
      });

      return summaries;
    },

    async toggleDeletion(bill) {
      bill.deleted = !bill.deleted;

      try {
        const newBills = [...this.bills];
        const billIndex = newBills.indexOf(bill);
        
        const updatedBill = await axios.put(`/api/bills/${ bill._id }/toggle`).then(response => response.data);
        newBills.splice(billIndex, 1, updatedBill);

        this.bills = newBills;
      }

      catch (e) {
        bill.deleted = !bill.deleted;
      }
    }
  }
}
</script>

<style>
  .loader--container {
    width: 100%;
    height: calc(100vh - 80px - 60px - 80px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .summaries {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .new-bill-container,
  .history-container {
    padding: 20px 0;
    display: flex;
    justify-content: center;
  }
</style>
