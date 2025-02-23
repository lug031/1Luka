//views/TransactionsView.vue
<template>
  <div class="transactions-container">
    <!-- Resumen de Balance -->
    <div class="balance-summary">
      <div class="balance-card">
        <h2>Balance Total</h2>
        <div class="amount-display">{{ balance }}</div>
        <div class="summary-grid">
          <div class="summary-item income">
            <span class="label">Ingresos </span>
            <span class="amount">{{ totalIncome }}</span>
          </div>
          <div class="summary-item expenses">
            <span class="label">Gastos </span>
            <span class="amount">{{ totalExpenses }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulario de Transacción -->
    <div class="transaction-form-container">
      <form @submit.prevent="handleSubmit" class="transaction-form">
        <h2>Nueva Transacción</h2>

        <!-- Tipo de Transacción -->
        <div class="form-group">
          <div class="type-selector">
            <button type="button" class="type-button" :class="{ active: form.type === 'INGRESO' }"
              @click="form.type = 'INGRESO'">
              <i class="fas fa-plus-circle"></i>
              Ingreso
            </button>
            <button type="button" class="type-button" :class="{ active: form.type === 'GASTO' }"
              @click="form.type = 'GASTO'">
              <i class="fas fa-minus-circle"></i>
              Gasto
            </button>
          </div>
        </div>

        <!-- Monto -->
        <div class="form-group">
          <label for="amount">Monto</label>
          <div class="input-with-icon">
            <span class="currency-symbol">S/</span>
            <input id="amount" v-model.number="form.amount" type="number" step="0.01" min="0" required
              placeholder="0.00" />
          </div>
        </div>

        <!-- Categoría -->
        <div class="form-group">
          <label for="category">Categoría</label>
          <select id="category" v-model="form.category" required>
            <option value="">Seleccionar categoría</option>
            <option value="Salario">Salario</option>
            <option value="Inversiones">Inversiones</option>
            <option value="Alimentación">Alimentación</option>
            <option value="Transporte">Transporte</option>
            <option value="Servicios">Servicios</option>
            <option value="Ocio">Ocio</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <!-- Descripción -->
        <div class="form-group">
          <label for="description">Descripción</label>
          <input id="description" v-model="form.description" type="text" required
            placeholder="Describe la transacción" />
        </div>

        <!-- Fecha -->
        <div class="form-group">
          <label for="date">Fecha</label>
          <input id="date" v-model="form.date" type="date" required />
        </div>

        <button type="submit" class="submit-button" :disabled="!isFormValid || loading">
          {{ loading ? 'Guardando...' : 'Guardar Transacción' }}
        </button>
      </form>
    </div>

    <!-- Lista de Transacciones -->
    <div class="transactions-list">
      <h2>Historial de Transacciones</h2>

      <div v-if="loading" class="loading-state">
        Cargando transacciones...
      </div>

      <div v-else-if="error" class="error-state">
        {{ error }}
      </div>

      <div v-else-if="transactions.length === 0" class="empty-state">
        No hay transacciones registradas
      </div>

      <template v-else>
        <div v-for="transaction in transactions" :key="transaction.id" class="transaction-item"
          :class="transaction.type.toLowerCase()">
          <div class="transaction-main">
            <div class="transaction-info">
              <span class="transaction-amount">
                {{ formatCurrency(transaction.amount) }}
              </span>
              <span class="transaction-description">
                {{ transaction.description }}
              </span>
            </div>
            <div class="transaction-details">
              <span class="transaction-category">
                {{ transaction.category }}
              </span>
              <span class="transaction-date">
                {{ formatDate(transaction.date) }}
              </span>
            </div>
          </div>
          <button class="delete-button" @click="handleDelete(transaction.id)" :disabled="loading">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTransactions } from '@/composables/useTransactions';

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
.transactions-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.balance-summary {
  grid-column: 1 / -1;
}

.balance-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.amount-display {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1rem 0;
  color: #2d3748;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.summary-item {
  padding: 1rem;
  border-radius: 0.5rem;
  background: #f7fafc;
}

.summary-item.income {
  border-left: 4px solid #48bb78;
}

.summary-item.expenses {
  border-left: 4px solid #f56565;
}

.transaction-form-container {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.transaction-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.type-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.type-button {
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.type-button.active {
  border-color: currentColor;
  background: #f7fafc;
}

.type-button.active:first-child {
  color: #48bb78;
}

.type-button.active:last-child {
  color: #f56565;
}

.input-with-icon {
  position: relative;
}

.currency-symbol {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
}

input[type="number"],
input[type="text"],
input[type="date"],
select {
  padding: 0.75rem;
  padding-left: 2rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.submit-button {
  background: #4299e1;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-button:hover:not(:disabled) {
  background: #3182ce;
}

.submit-button:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.transactions-list {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  transition: background 0.2s;
}

.transaction-item:hover {
  background: #f7fafc;
}

.transaction-main {
  flex: 1;
}

.transaction-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.transaction-amount {
  font-weight: 600;
  font-size: 1.1rem;
}

.transaction-item.ingreso .transaction-amount {
  color: #48bb78;
}

.transaction-item.gasto .transaction-amount {
  color: #f56565;
}

.transaction-details {
  display: flex;
  gap: 1rem;
  color: #718096;
  font-size: 0.875rem;
}

.delete-button {
  padding: 0.5rem;
  background: transparent;
  border: none;
  color: #718096;
  cursor: pointer;
  transition: color 0.2s;
}

.delete-button:hover:not(:disabled) {
  color: #f56565;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #718096;
}

.error-state {
  color: #f56565;
}

@media (max-width: 640px) {
  .transactions-container {
    padding: 1rem;
  }

  .balance-card,
  .transaction-form-container,
  .transactions-list {
    padding: 1.5rem;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .type-selector {
    grid-template-columns: 1fr;
  }

  .type-button {
    padding: 1rem;
  }

  .input-with-icon {
    position: relative;
  }

  .currency-symbol {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #718096;
  }

  input[type="number"],
  input[type="text"],
  input[type="date"],
  select {
    width: 100%;
    padding: 0.75rem;
    padding-left: 2rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  .submit-button {
    padding: 1rem;
  }

  .transaction-item {
    padding: 1rem;
  }

  .transaction-info {
    flex-direction: column;
    gap: 0.5rem;
  }

  .transaction-details {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
