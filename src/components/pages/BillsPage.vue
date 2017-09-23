<template>
  <div>
    <p>BillsPage</p>
    <div class="dropdown-container">
      <dropdown :options="options" :placeholder="'Kto'" v-model="chosen"></dropdown>
    </div>
    <!-- <p>kasdjfkadslkfhjklshfd</p> -->
  </div>
</template>

<script>
import Dropdown from '../controls/Dropdown.vue';

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      chosen: null,
      options: [
        { id: 0, text: 'Piotr Werner' },
        { id: 1, text: 'Dominik Rabij' },
        { id: 2, text: 'Rfu Flrczq' },
      ]
    }
  }
}
</script>

<style scoped>
  .dropdown-container {
    margin: 50px;
    width: 300px;
  }
</style>
