// composables/useTransactions.ts
import { ref, computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction'

export interface TransactionForm {
  type: 'INGRESO' | 'GASTO'
  amount: number
  description: string
  category: string
  date: string
}

export const defaultForm: TransactionForm = {
  type: 'INGRESO',
  amount: 0,
  description: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
}

export const useTransactions = () => {
  const store = useTransactionStore()
  const form = ref<TransactionForm>({ ...defaultForm })

  // Validación del formulario
  const isFormValid = computed(() => {
    const { amount, description, category } = form.value
    return amount > 0 && description.trim() !== '' && category !== ''
  })

  // Formateadores
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'PEN',
    }).format(amount)
  }

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Computed properties formateadas
  const formattedBalance = computed(() => formatCurrency(store.balance))
  const formattedIncome = computed(() => formatCurrency(store.totalIncome))
  const formattedExpenses = computed(() => formatCurrency(store.totalExpenses))

  // Acciones
  const resetForm = () => {
    form.value = { ...defaultForm }
  }

  const handleSubmit = async () => {
    if (!isFormValid.value) return

    try {
      await store.createTransaction(form.value)
      resetForm()
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta transacción?')) return

    try {
      await store.deleteTransaction(id)
    } catch (error) {
      console.error('Error al eliminar la transacción:', error)
    }
  }

  const loadTransactions = async () => {
    await store.fetchTransactions()
  }

  return {
    // State
    form,
    transactions: computed(() => store.transactions),
    loading: computed(() => store.loading),
    error: computed(() => store.error),

    // Computed
    isFormValid,
    balance: formattedBalance,
    totalIncome: formattedIncome,
    totalExpenses: formattedExpenses,

    // Actions
    handleSubmit,
    handleDelete,
    resetForm,
    loadTransactions,

    // Helpers
    formatDate,
    formatCurrency,
  }
}
