<template>
  <header>
    <div class="container">
      <div class="header">
        <div class="logo">
          <svg class="jar" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill="#000000" d="M74,25v-9c0-1.1-0.9-2-2-2H28c-1.1,0-2,0.9-2,2v9c0,1.1,0.9,2,2,2h2.8c-2.9,2.7-4.8,6.7-4.8,11v32   c0,8.3,6.7,15,14.9,15h18.5C67.4,85,74,78.3,74,70V38c0-4.3-1.8-8.3-4.7-11H72C73.1,27,74,26.1,74,25z M70,38v32   c0,6.1-4.8,11-10.6,11H40.9C35,81,30,76,30,70V38c0-6,5-11,10.9-11h18.5C65.2,27,70,31.9,70,38z M70,23H30v-5h40V23z"/></g><g><path fill="#000000" d="M65.3,67c-0.5,0-1-0.4-1-1V40.3c0-0.5,0.4-1,1-1s1,0.4,1,1V66C66.2,66.5,65.8,67,65.3,67z"/></g><g><circle fill="#000000" cx="65.3" cy="71" r="2.2"/></g></svg> 
          ROZLICZ SŁOJA
        </div>

        <nav>
          <router-link to="/" exact class="nav-item">Główna</router-link>
          <router-link to="/bills" exact class="nav-item">Rachunki</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped>
  header {
    height: 80px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.16);
    display: flex;
    justify-content: center;
  }

  .header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    font-size: 26px;
    font-weight: 300;
  }

  .jar {
    width: 40px;
  }

  nav {
    display: flex;
    height: 100%;
  }

  .nav-item {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 30px;
    outline: none;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 15px;
    transition: color 200ms ease;
    color: rgba(0, 0, 0, 0.6);
    border-bottom: 1px solid transparent;
  }

  .nav-item:hover {
    color: #2c3e50;
    border-bottom: 1px solid #2c3e50;
  }

  .nav-item.router-link-active {
    color: #2c3e50;
  }
</style>
