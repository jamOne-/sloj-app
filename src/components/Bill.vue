<template>
  <div class="bill">
    <input class="comment-input" type="text" placeholder="Komentarz..." v-model="bill.comment" :readonly="readonly">

    <div class="bill-entries">
      <div class="entry" v-for="(entry, index) of bill.entries" :key="index">
        <input type="text" placeholder="Kto" v-model="entry.from" :class="{ filled: entry.from }" :readonly="readonly">
        <div class="entry-arrow">&rarr;</div>
        <input type="text" placeholder="Komu" v-model="entry.to" :class="{ filled: entry.to }" :readonly="readonly">
        <input class="amount-input" type="text" placeholder="Ile hajsu" v-model="entry.amount" :class="{ filled: entry.amount }" @keyup.enter="index == bill.entries.length - 1 && addNewEntry()" :readonly="readonly">
        <div class="icon-container" v-if="!readonly && index == bill.entries.length - 1" @click="addNewEntry()"><svg class="icon" fill="#cccccc" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div>
        <div class="icon-container" v-if="!readonly && index != bill.entries.length - 1" @click="removeEntry(index)"><svg class="icon" fill="#cccccc" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div>
      </div>
    </div>

    <div v-if="newBill" class="buttons">
      <button class="button button-hover" @click="resetData()">Wyczyść</button>
      <button class="button" @click="saveBill()" :class="{ valid: isValid }">Zapisz rachunek</button>
    </div>
  </div>
</template>

<script>
function getNewBill() {
  return {
    comment: '',
    entries: [
      {
        from: '',
        to: '',
        amount: ''
      }
    ]
  };
}

export default {
  props: {
    bill: {
      default: getNewBill
    },
    newBill: {
      default: false
    },
    editable: {
      default: false
    }
  },

  methods: {
    resetData() {
      this.bill = getNewBill();
    },

    addNewEntry() {
      this.bill.entries.push({ from: '', to: '', amount: '' });
    },

    removeEntry(index) {
      this.bill.entries.splice(index, 1);
    },

    isEntryEmpty(entry) {
      return !entry.from && !entry.to && !entry.amount;
    },

    isEntryFilled(entry) {
      return entry.from && entry.to && entry.amount;
    },

    saveBill() {
      if (this.isValid) {
        const entries = this.bill.entries.filter(this.isEntryFilled);
        entries.forEach(entry => entry.amount = Number(entry.amount));

        if (this.newBill)
          this.$emit('addBill', { comment: this.bill.comment, entries });
        else
          this.$emit('saveBill', { comment: this.bill.comment, entries });
        
        this.resetData();
      }
    }
  },

  computed: {
    isValid() {
      return this.bill.comment &&
        this.bill.entries.some(this.isEntryFilled) &&
        this.bill.entries.every(entry => this.isEntryEmpty(entry) || this.isEntryFilled(entry));
    },
    readonly() {
      return !this.newBill && !this.editable;
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

  .icon-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
  }

  .icon-container:hover .icon {
    fill: #2c3e50;
  }

  input {
    height: 35px;
    width: 100%;
    font-size: 20px;
    font-weight: 300;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    outline: none;
    padding: 0 4px;
    transition: all 300ms ease;
  }

  input:focus,
  input.filled {
    border-bottom-color: #2c3e50;
  }

  input[readonly] {
    border-bottom-color: transparent;
  }

  input.filled + .entry-arrow {
    color: inherit;
  }

  input::placeholder {
    color: #cccccc;
  }

  .buttons {
    margin-top: 35px;
  }

  .button {
    margin-right: 20px;
    height: 40px;
    padding: 0 10px;
    background-color: #fff;
    color: white;
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
