//views/HomeView.vue
<template>
  <div class="home-container">
    <section class="hero">
      <h1>Bienvenido a 1Luka</h1>
      <p>Gestiona tus ingresos y gastos de manera simple y efectiva</p>
      <RouterLink to="/transactions" class="cta-button">
        Comenzar a registrar
      </RouterLink>
    </section>

    <section class="features">
      <div class="feature-card">
        <h3>Registro Simple</h3>
        <p>Registra tus transacciones de manera rápida y sencilla</p>
      </div>
      <div class="feature-card">
        <h3>Categorización</h3>
        <p>Organiza tus gastos e ingresos por categorías</p>
      </div>
      <div class="feature-card">
        <h3>Seguimiento</h3>
        <p>Visualiza tu balance y tendencias financieras</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  color: #4a5568;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  background: #4299e1;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}

.cta-button:hover {
  background: #3182ce;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-card h3 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #4a5568;
}

@media (max-width: 640px) {
  .hero {
    padding: 2rem 1rem;
  }

  .hero h1 {
    font-size: 2rem;
  }
}
</style>
