//views/TransactionsView.vue
<template>
  <div class="app-container">
    <div class="left-panel">
      <!-- Balance Card -->
      <div class="balance-card">
        <div class="balance-header">
          <h2>Balance Total</h2>
          <div class="balance-amount">{{ balance }}</div>
        </div>
        <div class="quick-stats">
          <div class="stat-item positive">
            <i class="fas fa-arrow-up"></i>
            <div class="stat-content">
              <span class="stat-label">Ingresos</span>
              <span class="stat-value">{{ totalIncome }}</span>
            </div>
          </div>
          <div class="stat-item negative">
            <i class="fas fa-arrow-down"></i>
            <div class="stat-content">
              <span class="stat-label">Gastos</span>
              <span class="stat-value">{{ totalExpenses }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Add Transaction -->
      <div class="quick-add-section">
        <div class="type-tabs">
          <button :class="['tab-btn', form.type === 'INGRESO' ? 'active-income' : '']" @click="form.type = 'INGRESO'">
            <i class="fas fa-plus"></i> Ingreso
          </button>
          <button :class="['tab-btn', form.type === 'GASTO' ? 'active-expense' : '']" @click="form.type = 'GASTO'">
            <i class="fas fa-minus"></i> Gasto
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="quick-form">
          <div class="input-group">
            <span class="currency-symbol">S/</span>
            <input v-model.number="form.amount" type="number" placeholder="0.00" step="0.01" min="0" required />
          </div>

          <select v-model="form.category" required>
            <option value="">Categoría</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>

          <input v-model="form.description" type="text" placeholder="Descripción breve" required />

          <input v-model="form.date" type="date" required />

          <button type="submit" :class="['submit-btn', form.type === 'INGRESO' ? 'income' : 'expense']"
            :disabled="!isFormValid || loading">
            {{ loading ? 'Guardando...' : 'Agregar ' + form.type.toLowerCase() }}
          </button>
        </form>
      </div>
    </div>

    <!-- Right Panel - Transactions List -->
    <div class="right-panel">
      <div class="transactions-section">
        <h3>Movimientos Recientes</h3>

        <div v-if="loading" class="status-message">
          <i class="fas fa-spinner fa-spin"></i> Cargando...
        </div>

        <div v-else-if="error" class="status-message error">
          <i class="fas fa-exclamation-circle"></i> {{ error }}
        </div>

        <div v-else-if="transactions.length === 0" class="status-message">
          <i class="fas fa-inbox"></i> No hay transacciones registradas
        </div>

        <div v-else class="transactions-list">
          <TransitionGroup name="list">
            <div v-for="tx in transactions" :key="tx.id" :class="['transaction-card', tx.type.toLowerCase()]">
              <div class="tx-main">
                <div class="tx-icon">
                  <i :class="['fas', tx.type === 'INGRESO' ? 'fa-arrow-up' : 'fa-arrow-down']"></i>
                </div>
                <div class="tx-info">
                  <div class="tx-primary">
                    <span class="tx-description">{{ tx.description }}</span>
                    <span class="tx-amount">{{ formatCurrency(tx.amount) }}</span>
                  </div>
                  <div class="tx-secondary">
                    <span class="tx-category">{{ tx.category }}</span>
                    <span class="tx-date">{{ formatDate(tx.date) }}</span>
                  </div>
                </div>
              </div>
              <button class="delete-btn" @click="handleDelete(tx.id)" :disabled="loading" title="Eliminar transacción">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTransactions } from '@/composables/useTransactions';

const categories = [
  'Salario',
  'Inversiones',
  'Alimentación',
  'Transporte',
  'Servicios',
  'Ocio',
  'Otros'
];

const {
  form,
  transactions,
  loading,
  error,
  isFormValid,
  balance,
  totalIncome,
  totalExpenses,
  handleSubmit,
  handleDelete,
  loadTransactions,
  formatDate,
  formatCurrency,
} = useTransactions();

onMounted(loadTransactions);
</script>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: minmax(300px, 400px) 1fr;
  gap: 1.5rem;
  height: calc(100vh - 2rem);
  margin: 1rem;
  overflow: hidden;
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
}

.right-panel {
  height: 100%;
  overflow: hidden;
}

.balance-card {
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.balance-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.balance-amount {
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
}

.quick-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
}

.stat-item i {
  font-size: 1.25rem;
}

.positive i {
  color: #48bb78;
}

.negative i {
  color: #f56565;
}

.quick-add-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.type-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tab-btn {
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background: #f7fafc;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: #edf2f7;
}

.active-income {
  background: #48bb78;
  color: white;
}

.active-income:hover {
  background: #38a169;
}

.active-expense {
  background: #f56565;
  color: white;
}

.active-expense:hover {
  background: #e53e3e;
}

.quick-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  position: relative;
}

.currency-symbol {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
  user-select: none;
}

input,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4299e1;
}

input[type="number"] {
  padding-left: 2.5rem;
}

.submit-btn {
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn.income {
  background: #48bb78;
}

.submit-btn.income:hover:not(:disabled) {
  background: #38a169;
}

.submit-btn.expense {
  background: #f56565;
}

.submit-btn.expense:hover:not(:disabled) {
  background: #e53e3e;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.transactions-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.transactions-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-top: 1rem;
}

/* Estilizar la barra de desplazamiento */
.transactions-list::-webkit-scrollbar {
  width: 8px;
}

.transactions-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.transactions-list::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.transactions-list::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.transaction-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background: #f7fafc;
  transition: all 0.2s ease;
  margin-bottom: 0.75rem;
}

.transaction-card:hover {
  transform: translateX(4px);
  background: #edf2f7;
}

.tx-main {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.tx-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #edf2f7;
  transition: all 0.2s;
}

.transaction-card:hover .tx-icon {
  background: #e2e8f0;
}

.ingreso .tx-icon {
  color: #48bb78;
}

.gasto .tx-icon {
  color: #f56565;
}

.tx-info {
  flex: 1;
}

.tx-primary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.tx-description {
  font-weight: 500;
}

.tx-amount {
  font-weight: 600;
}

.ingreso .tx-amount {
  color: #48bb78;
}

.gasto .tx-amount {
  color: #f56565;
}

.tx-secondary {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #718096;
}

.delete-btn {
  padding: 0.5rem;
  border: none;
  background: transparent;
  color: #cbd5e0;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 0.25rem;
}

.delete-btn:hover:not(:disabled) {
  color: #f56565;
  background: #fed7d7;
}

.delete-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status-message {
  text-align: center;
  padding: 2rem;
  color: #718096;
}

.status-message.error {
  color: #f56565;
}

/* Animaciones de lista */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 768px) {
  .app-container {
    grid-template-columns: 1fr;
    height: auto;
    overflow: visible;
  }

  .right-panel {
    height: 500px;
    /* Altura fija en móviles */
  }

  .transactions-section {
    height: 100%;
  }

  .quick-stats {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
