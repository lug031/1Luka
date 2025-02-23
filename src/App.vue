//App.vue
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar">
      <RouterLink to="/" class="nav-logo">
        🪙 1Luka
      </RouterLink>

      <div class="nav-links">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/transactions">Transacciones</RouterLink>
        <RouterLink to="/categories">Categorías</RouterLink>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.navbar {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #2d3748;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.nav-links a:hover {
  background: #f7fafc;
}

.nav-links a.router-link-active {
  color: #4299e1;
  background: #ebf8ff;
}

main {
  padding: 2rem;
  background: #f7fafc;
  min-height: calc(100vh - 4rem);
}

@media (max-width: 640px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
