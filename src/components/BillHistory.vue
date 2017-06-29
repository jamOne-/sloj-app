<template>
  <div class="container">
    <!--<bill v-for="bill in bills"></bill>-->
  </div>
</template>

<script>
import Bill from './Bill.vue';

export default {
  data() {
    return {
      bills: [1,2,3]
    };
  },
  components: {
    Bill
  }
}
</script>

<style scoped>
  
</style>
