<template>
  <header>
    <div class="container">
      <div class="header">
        <div class="logo">ROZLICZ SŁOJA</div>

        <nav>
          <a class="nav-item" href="#">Główna</a>
          <a class="nav-item" href="#">Rachunki</a>
          <a class="nav-item" href="#">Użytkownicy</a>
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
    font-size: 26px;
    font-weight: 300;
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
    font-size: 14px;
    transition: color 200ms ease;
    color: rgba(0, 0, 0, 0.6);
  }

  .nav-item:hover {
    color: #2c3e50;
    border-bottom: 1px solid #2c3e50;
  }
</style>
