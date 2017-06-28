<template>
  <div id="app">
    <app-header></app-header>
    <app-content></app-content>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppContent from './components/AppContent.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    AppHeader,
    AppContent,
    AppFooter
  }
}
</script>

<style>
* {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  background: #e8e8e8;
}
</style>
