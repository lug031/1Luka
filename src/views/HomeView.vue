<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Gestiona tus finanzas con <span class="brand-highlight">1Luka</span></h1>
        <p class="hero-description">
          Controla tus ingresos y gastos de manera inteligente. Toma mejores decisiones financieras.
        </p>
        <RouterLink to="/transactions" class="cta-button">
          <PlusCircle :size="20" />
          <span>Comenzar ahora</span>
        </RouterLink>
      </div>
      <div class="hero-stats">
        <div class="stat-card">
          <CircleDollarSign :size="24" class="stat-icon" />
          <div class="stat-info">
            <h3>Balance Total</h3>
            <div class="stat-value">{{ balance }}</div>
          </div>
        </div>
        <div class="stats-grid">
          <div class="mini-stat income">
            <ArrowUpCircle :size="20" />
            <div>
              <span>Ingresos</span>
              <strong>{{ totalIncome }}</strong>
            </div>
          </div>
          <div class="mini-stat expense">
            <ArrowDownCircle :size="20" />
            <div>
              <span>Gastos</span>
              <strong>{{ totalExpenses }}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="feature-card">
        <div class="feature-icon">
          <Receipt :size="24" />
        </div>
        <h3>Registro Simple</h3>
        <p>Registra tus transacciones de manera rápida y sencilla desde cualquier dispositivo</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <Tags :size="24" />
        </div>
        <h3>Categorización</h3>
        <p>Organiza y clasifica tus movimientos para un mejor control de tus finanzas</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <LineChart :size="24" />
        </div>
        <h3>Seguimiento</h3>
        <p>Visualiza tus tendencias financieras y toma mejores decisiones</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <Wallet :size="24" />
        </div>
        <h3>Control Total</h3>
        <p>Mantén el control de tu dinero y alcanza tus metas financieras</p>
      </div>
    </section>

    <!-- Recent Transactions Preview -->
    <section v-if="transactions.length > 0" class="transactions-preview">
      <div class="section-header">
        <h2>Últimas Transacciones</h2>
        <RouterLink to="/transactions" class="view-all">
          Ver todas
          <ArrowRight :size="16" />
        </RouterLink>
      </div>
      <div class="preview-list">
        <div v-for="tx in transactions.slice(0, 3)" :key="tx.id" :class="['preview-card', tx.type.toLowerCase()]">
          <div class="preview-icon">
            <ArrowUpCircle v-if="tx.type === 'INGRESO'" :size="20" />
            <ArrowDownCircle v-else :size="20" />
          </div>
          <div class="preview-info">
            <span class="preview-description">{{ tx.description }}</span>
            <span class="preview-category">{{ tx.category }}</span>
          </div>
          <div class="preview-amount">
            {{ formatCurrency(tx.amount) }}
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Start Section -->
    <section class="quick-start-section">
      <div class="quick-start-header">
        <h2>Comienza en 3 pasos simples</h2>
        <p>Es fácil empezar a gestionar tus finanzas con 1Luka</p>
      </div>
      <div class="steps-container">
        <div class="step-card">
          <div class="step-number">1</div>
          <UserPlus :size="24" />
          <h3>Crea tu cuenta</h3>
          <p>Regístrate gratis en menos de un minuto</p>
        </div>
        <div class="step-card">
          <div class="step-number">2</div>
          <Receipt :size="24" />
          <h3>Registra movimientos</h3>
          <p>Añade tus ingresos y gastos fácilmente</p>
        </div>
        <div class="step-card">
          <div class="step-number">3</div>
          <TrendingUp :size="24" />
          <h3>Controla tus finanzas</h3>
          <p>Visualiza tu progreso financiero</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTransactions } from '@/composables/useTransactions';
import {
  PlusCircle,
  CircleDollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  LineChart,
  Tags,
  Receipt,
  Wallet,
  UserPlus,
  TrendingUp,
  ArrowRight
} from 'lucide-vue-next';

const {
  transactions,
  balance,
  totalIncome,
  totalExpenses,
  loadTransactions,
  formatCurrency
} = useTransactions();

onMounted(loadTransactions);
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Hero Section */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1e293b;
}

.brand-highlight {
  color: #3b82f6;
}

.hero-description {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.6;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  width: fit-content;
}

.cta-button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.hero-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
}

.stat-icon {
  color: #3b82f6;
}

.stat-info h3 {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.mini-stat {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
}

.mini-stat div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mini-stat span {
  font-size: 0.75rem;
  color: #64748b;
}

.mini-stat strong {
  color: #1e293b;
}

.mini-stat.income {
  color: #059669;
}

.mini-stat.expense {
  color: #dc2626;
}

/* Features Section */
.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  display: inline-flex;
  padding: 0.75rem;
  background: #f0f9ff;
  color: #3b82f6;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.125rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #64748b;
  line-height: 1.5;
}

/* Transactions Preview Section */
.transactions-preview {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.25rem;
  color: #1e293b;
}

.view-all {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.preview-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.preview-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  transition: background-color 0.2s;
}

.preview-card:hover {
  background: #f1f5f9;
}

.preview-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #f0f9ff;
}

.preview-card.ingreso .preview-icon {
  color: #059669;
  background: #dcfce7;
}

.preview-card.gasto .preview-icon {
  color: #dc2626;
  background: #fee2e2;
}

.preview-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.preview-description {
  font-weight: 500;
  color: #1e293b;
}

.preview-category {
  font-size: 0.875rem;
  color: #64748b;
}

.preview-amount {
  font-weight: 600;
}

.ingreso .preview-amount {
  color: #059669;
}

.gasto .preview-amount {
  color: #dc2626;
}

/* Quick Start Section */
.quick-start-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.quick-start-header {
  text-align: center;
  margin-bottom: 2rem;
}

.quick-start-header h2 {
  font-size: 1.875rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.quick-start-header p {
  color: #64748b;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.step-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  gap: 1rem;
}

.step-number {
  position: absolute;
  top: -1rem;
  background: #3b82f6;
  color: white;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
}

.step-card svg {
  color: #3b82f6;
}

.step-card h3 {
  color: #1e293b;
  font-size: 1.125rem;
}

.step-card p {
  color: #64748b;
}

/* Responsive Design */
/* Ajustes responsivos para el hero section */
@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .hero-content {
    text-align: center;
  }

  .hero-content h1 {
    font-size: 1.75rem;
  }

  .cta-button {
    margin: 0 auto;
  }

  .hero-stats {
    width: 100%;
  }

  .stat-card {
    padding: 1.25rem;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
    /* Mantiene dos columnas en móvil */
    gap: 0.75rem;
  }

  .mini-stat {
    padding: 0.875rem;
  }

  .stat-value {
    font-size: 1.25rem;
  }

  .mini-stat strong {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1rem;
  }

  .hero-content h1 {
    font-size: 1.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }
}
</style>
