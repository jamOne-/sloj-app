module.exports = {
  routes: [
    { path: '/', component: require('./components/pages/MainPage.vue') },
    { path: '/bills', component: require('./components/pages/BillsPage.vue') }
  ]
};