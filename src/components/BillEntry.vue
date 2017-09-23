<template>
  <div class="entry" :class="{ deleted: bill.deleted, expanded: expanded }">
    <div class="main-content" @click="expanded = !expanded">
      <span>{{ bill.from }}</span>
      <span class="arrow">&rarr;</span>
      <span>{{ bill.to }}</span>
      <span class="entry-date">/{{ formatDate(bill.creationDate) }}/</span>
      <span class="amount">{{ formatAmount(bill.amount) }} zł</span>
      <svg class="expand-arrow" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>
    </div>
    <div class="additional-content-wrapper">
      <div class="additional-content">
        <p><strong>Komentarz:</strong></p>
        <p v-if="bill.comment">{{ bill.comment }}</p>
        <p v-if="!bill.comment"><i>brak</i></p>

        <p><strong>Utworzył:</strong></p>
        <p>{{ bill.author }}, {{ formatDate(bill.creationDate) }}</p>

        <p v-if="bill.deleted"><strong>Zestornował:</strong></p>
        <p v-if="bill.deleted">{{ bill.toggleAuthor }}, {{ formatDate(bill.toggleDate) }}</p>
      </div>
      <div class="buttons">
        <button @click="toggleDeletion()" class="button button-hover">
          <span style="margin-right: 5px;">{{ stornoText }}</span>
          <svg v-if="bill.deleted" class="icon" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          <svg v-if="!bill.deleted" class="icon" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg> 
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bill'],
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    formatAmount(amount) {
      return Number(amount).toFixed(2);
    },
    toggleDeletion() {
      this.$emit('toggleDeletion', this.bill);
    },
    formatDate(stringDate) {
      const date = new Date(stringDate);
      return date.toLocaleString('pl-pl', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  },
  computed: {
    stornoText() {
      return this.bill.deleted ? 'Weź odstornuj' : 'Storno mordo';
    }
  }
}
</script>

<style scoped>
  .entry.deleted .main-content {
    text-decoration: line-through;
    background-color: rgba(0, 0, 0, 0.08);
  }

  .main-content {
    padding: 10px 20px;
    display: grid; 
    grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr 40px;
    grid-column-gap: 10px;  
    align-items: center;
    cursor: pointer;
  }

  .arrow {
    text-align: center;
  }

  .amount {
    text-align: right;
  }

  .icon {
    fill: white;
    cursor: pointer;
  }

  .entry-date {
    font-size: 16px;
    text-align: center;
  }

  .expand-arrow {
    fill: #2c3e50;
    justify-self: end;
    transition: transform 250ms ease-out;
  }

  .entry.expanded .expand-arrow {
    transform: rotate(90deg);
    transition: transform 300ms ease-in;
  }

  .additional-content-wrapper {
    width: 100%;
    max-height: 0; 
    height: auto;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.03);
    transition: max-height 250ms ease-out;
  }

  .entry.expanded .additional-content-wrapper {
    max-height: 200px;
    transition: max-height 300ms ease-in;
  }

  .additional-content {
    padding: 20px 40px;
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px 20px;
    font-size: 16px;
  }

  .buttons {
    padding: 0 40px 20px;
  }

  .button {
    display: flex;
    align-items: center;
    margin-right: 20px;
    height: 35px;
    padding: 0 10px;
    background-color: black;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 15px;
    text-transform: uppercase;
    border: 1px solid black;
    transition: all 400ms ease;
  }

  .button:hover {
    background-color: #2c3e50;
    border-color: #2c3e50;
  }
</style>
