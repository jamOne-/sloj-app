<template>
  <div id="app">
    <app-header></app-header>
    <app-content></app-content>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/app/AppHeader.vue'
import AppContent from './components/app/AppContent.vue'
import AppFooter from './components/app/AppFooter.vue'

export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  components: {
    AppHeader,
    AppContent,
    AppFooter
  }
}
</script>

<style>
  body {
    font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    overflow-y: scroll;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .container {
    max-width: 1200px;
    width: 100%;
    height: 100%;
    margin: 0 40px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
