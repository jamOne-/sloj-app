<template>
  <div class="bill">
    <input class="comment-input" type="text" placeholder="Komentarz..." v-model="bill.comment">

    <div class="entry">
      <dropdown placeholder="Kto" v-model="bill.from" :options="froms" :class="{ filled: bill.from }"></dropdown>
      <div class="entry-arrow">&rarr;</div>
      <dropdown placeholder="Komu" v-model="bill.to"  :options="tos" :class="{ filled: bill.to }"></dropdown>
      <amount-input placeholder="Ile hajsu" currency="zł" v-model="bill.amount"></amount-input>
    </div>

    <div class="buttons">
      <button class="button button-hover" @click="resetData()">Wyczyść</button>
      <button class="button" @click="saveBill()" :class="{ valid: isValid }">Zapisz rachunek</button>
    </div>
  </div>
</template>

<script>
import AmountInput from './controls/AmountInput.vue';
import Dropdown from './controls/Dropdown.vue';

export default {
  components: {
    AmountInput,
    Dropdown
  },

  props: ['possibleFroms', 'possibleTos'],

  data() {
    return {
      bill: {
        comment: '',
        from: '',
        to: '',
        amount: ''
      }
    }
  },

  methods: {
    resetData() {
      this.bill.comment = this.bill.from = this.bill.to = this.bill.amount = '';
    },

    saveBill() {
      if (this.isValid) {
        const newBill = Object.assign({}, this.bill, {
          amount: this.string2Number(this.bill.amount),
          from: this.bill.from.name,
          to: this.bill.to.name
        });

        this.$emit('addBill', newBill);
        this.resetData();
      }
    },

    string2Number(string) {
      return Number(string.replace(/,/g, comma => '.'));
    }
  },

  computed: {
    isValid() {
      return this.bill.from && this.bill.to && this.bill.amount && this.string2Number(this.bill.amount);
    },

    froms() {
      return this.possibleFroms.map(from => Object.assign({}, from, { id: from.name, text: from.name }));
    },

    tos() {
      return this.possibleTos.map(to => Object.assign({}, to, { id: to.name, text: to.name }));
    }
  }
}
</script>

<style scoped>
  .bill {
    padding: 20px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, .1), 0px 0px 4px rgba(0, 0, 0, .1);
  }

  .comment-input {
    font-size: 25px;
    height: 35px;
    margin-bottom: 20px;
  }

  .comment-input:not(:focus) {
    border-bottom: 2px solid transparent;
  }

  .entry {
    display: grid;
    align-items: center;
    grid-template-columns: 200px 20px 200px 120px 40px;
    grid-column-gap: 20px;
    font-size: 20px;
    padding: 5px 0;
  }

  .entry-arrow {
    color: #cccccc;
    transition: color 400ms ease;
  }

  .dropdown.filled + .entry-arrow {
    color: inherit;
  }

  .buttons {
    margin-top: 35px;
  }

  .button {
    margin-right: 20px;
    height: 40px;
    padding: 0 10px;
    background-color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 17px;
    text-transform: uppercase;
    border: 1px solid #ccc;
    color: #ccc;
    transition: all 400ms ease;
    font-weight: 300;
  }

  .button.button-hover:hover,
  .valid {
    border-color: #2c3e50;
    color: inherit;
  }
</style>
