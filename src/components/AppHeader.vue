<template>
  <header>
    <div class="container">
      <div class="logo">SŁÓJ-APP</div>

      <nav>
        <a class="nav-item" href="#">Główna</a>
        <a class="nav-item" href="#">Historia</a>
        <a class="nav-item" href="#">Użytkownicy</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      user: 'Dominik'
    }
  }
}
</script>

<style scoped>
  header {
    width: 100%;
    height: 60px;
    background: #2980b9;
  }

  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    color: white;
    font-weight: bold;
    font-size: 30px;
    text-transform: uppercase;
  }

  nav {
    display: flex;
    height: 100%;
  }

  .nav-item {
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    transition: all 200ms ease;
  }

  .nav-item:hover {
    background-color: #3498db;
  }
</style>
