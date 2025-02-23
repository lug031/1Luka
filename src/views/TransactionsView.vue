//views/TransactionsView.vue
<template>
  <div class="app-container">
    <!-- Panel Izquierdo -->
    <div class="left-panel">
      <!-- Balance Summary -->
      <div class="balance-summary">
        <div class="total-balance">
          <span class="label">Balance Total</span>
          <span class="amount">{{ balance }}</span>
        </div>
        <div class="stats-grid">
          <div class="stat-box income">
            <ArrowUpCircle :size="20" />
            <div>
              <span class="stat-label">Ingresos</span>
              <span class="stat-amount">{{ totalIncome }}</span>
            </div>
          </div>
          <div class="stat-box expense">
            <ArrowDownCircle :size="20" />
            <div>
              <span class="stat-label">Gastos</span>
              <span class="stat-amount">{{ totalExpenses }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Add Form -->
      <div class="quick-add">
        <div class="type-selector">
          <button :class="['type-btn', { active: form.type === 'INGRESO' }]" @click="form.type = 'INGRESO'">
            <PlusCircle :size="18" />
            <span>Ingreso</span>
          </button>
          <button :class="['type-btn', { active: form.type === 'GASTO' }]" @click="form.type = 'GASTO'">
            <MinusCircle :size="18" />
            <span>Gasto</span>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="add-form">
          <div class="form-group">
            <CreditCard class="input-icon" :size="18" />
            <input v-model.number="form.amount" type="number" placeholder="Monto" step="0.01" min="0" required />
          </div>

          <div class="form-group">
            <Tag class="input-icon" :size="18" />
            <select v-model="form.category" required>
              <option value="">Categoría</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <FileText class="input-icon" :size="18" />
            <input v-model="form.description" type="text" placeholder="Descripción" required />
          </div>

          <div class="form-group">
            <Calendar class="input-icon" :size="18" />
            <input v-model="form.date" type="date" required />
          </div>

          <button type="submit" :class="['submit-button', form.type.toLowerCase()]" :disabled="!isFormValid || loading">
            <Plus v-if="!loading" :size="18" />
            <Loader v-else :size="18" class="spin" />
            {{ loading ? 'Guardando...' : 'Agregar ' + form.type.toLowerCase() }}
          </button>
        </form>
      </div>
    </div>

    <!-- Panel Derecho -->
    <div class="right-panel">
      <div class="transactions-container">
        <div class="header">
          <h2>Movimientos Recientes</h2>
          <RefreshCw :size="20" class="refresh-icon" :class="{ 'spinning': loading }" @click="loadTransactions" />
        </div>

        <div v-if="error" class="status-message error">
          <AlertCircle :size="20" />
          <span>{{ error }}</span>
        </div>

        <div v-else-if="transactions.length === 0" class="status-message empty">
          <Inbox :size="20" />
          <span>No hay transacciones registradas</span>
        </div>

        <TransitionGroup v-else name="list" tag="div" class="transactions-list">
          <div v-for="tx in transactions" :key="tx.id" class="transaction-item" :class="tx.type.toLowerCase()">
            <div class="tx-content">
              <div class="tx-icon">
                <ArrowUpCircle v-if="tx.type === 'INGRESO'" :size="20" />
                <ArrowDownCircle v-else :size="20" />
              </div>
              <div class="tx-details">
                <div class="tx-main">
                  <span class="tx-description">{{ tx.description }}</span>
                  <span class="tx-amount">{{ formatCurrency(tx.amount) }}</span>
                </div>
                <div class="tx-sub">
                  <span class="tx-date">{{ formatDate(tx.date) }}</span>
                </div>
              </div>
            </div>
            <button class="delete-btn" @click="handleDelete(tx.id)" :disabled="loading">
              <Trash2 :size="16" />
            </button>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTransactions } from '@/composables/useTransactions';
import {
  ArrowUpCircle,
  ArrowDownCircle,
  PlusCircle,
  MinusCircle,
  CreditCard,
  Calendar,
  FileText,
  Tag,
  Plus,
  Loader,
  RefreshCw,
  AlertCircle,
  Inbox,
  Trash2,
} from 'lucide-vue-next';

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
  grid-template-columns: 360px 1fr;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  height: calc(100vh - 5rem);
  /* Ajustado para el navbar */
  min-height: 600px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
}

/* Balance Summary Styles */
.balance-summary {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.total-balance {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.total-balance .label {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.total-balance .amount {
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f8fafc;
}

.stat-box.income {
  color: #059669;
}

.stat-box.expense {
  color: #dc2626;
}

.stat-box div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
}

.stat-amount {
  font-weight: 600;
  color: #1e293b;
}

/* Quick Add Form Styles */
.quick-add {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.type-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.type-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.type-btn:hover {
  background: #f8fafc;
}

.type-btn.active {
  border-width: 2px;
}

.type-btn.active:first-child {
  border-color: #059669;
  color: #059669;
}

.type-btn.active:last-child {
  border-color: #dc2626;
  color: #dc2626;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #1e293b;
  background: white;
  transition: all 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-button.ingreso {
  background: #059669;
}

.submit-button.ingreso:hover:not(:disabled) {
  background: #047857;
}

.submit-button.gasto {
  background: #dc2626;
}

.submit-button.gasto:hover:not(:disabled) {
  background: #b91c1c;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Transactions List Styles */
.right-panel {
  height: 100%;
  overflow: hidden;
}

.transactions-container {
  background: white;
  border-radius: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.refresh-icon {
  cursor: pointer;
  color: #64748b;
  transition: all 0.3s;
}

.refresh-icon:hover {
  color: #3b82f6;
}

.refresh-icon.spinning {
  animation: spin 1s linear infinite;
}

.transactions-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.transaction-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 8px;
  background: #f8fafc;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
}

.transaction-item:hover {
  background: #f1f5f9;
}

.tx-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.tx-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

.ingreso .tx-icon {
  color: #059669;
  background: #dcfce7;
}

.gasto .tx-icon {
  color: #dc2626;
  background: #fee2e2;
}

.tx-details {
  flex: 1;
}

.tx-main {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.tx-description {
  font-weight: 500;
  color: #1e293b;
}

.tx-amount {
  font-weight: 600;
}

.ingreso .tx-amount {
  color: #059669;
}

.gasto .tx-amount {
  color: #dc2626;
}

.tx-sub {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  color: #64748b;
}

.tx-sub :deep(.badge) {
  background: #e2e8f0;
  color: #475569;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.tx-date {
  color: #64748b;
}

.delete-btn {
  padding: 0.5rem;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.delete-btn:hover:not(:disabled) {
  color: #dc2626;
  background: #fee2e2;
}

.status-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  color: #64748b;
  text-align: center;
}

.status-message.error {
  color: #dc2626;
}

/* Animations */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 1s linear infinite;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-container {
    grid-template-columns: 1fr;
    height: auto;
    gap: 1rem;
  }

  .left-panel {
    overflow-y: visible;
  }

  .right-panel {
    height: 500px;
  }
}
</style>
