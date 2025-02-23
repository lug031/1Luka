<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app-container">
    <header>
      <nav class="navbar">
        <RouterLink to="/" class="nav-logo">
          🪙 1Luka
        </RouterLink>

        <div class="nav-links">
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/transactions">Transacciones</RouterLink>
        </div>
      </nav>
    </header>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: #f1f5f9;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
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

/* Contenedor principal para las vistas */
.main-content {
  margin-top: 4rem;
  /* Altura del navbar + espacio extra */
  flex: 1;
  padding: 1rem;
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

  .main-content {
    margin-top: 7rem;
    /* Ajustar para navbar más alto en móvil */
  }
}
</style>
