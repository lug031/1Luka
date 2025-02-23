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
          <RouterLink to="/categories">Categorías</RouterLink>
        </div>
      </nav>
    </header>
    <RouterView />
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
}

.app-container {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

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

/* Ajuste del espaciado cuando el banner está presente */
.has-maintenance-banner {
  padding-top: 76px;
}

@media (max-width: 640px) {
  .has-maintenance-banner {
    padding-top: 120px;
  }
}

/* Asegura que el banner no tape elementos fixed/sticky */
.has-maintenance-banner .fixed,
.has-maintenance-banner .sticky {
  top: 76px;
}

@media (max-width: 640px) {

  .has-maintenance-banner .fixed,
  .has-maintenance-banner .sticky {
    top: 120px;
  }
}
</style>
