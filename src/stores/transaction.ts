import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

export interface Transaction {
  id: string
  type: 'INGRESO' | 'GASTO'
  amount: number
  description: string
  category: string
  date: string
  userId?: string
  createdAt?: string
  updatedAt?: string
}

const publicClient = generateClient<Schema>({
  authMode: 'apiKey',
})

const authClient = generateClient<Schema>({
  authMode: 'userPool',
})

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<Transaction[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const totalIncome = computed(() =>
    transactions.value.filter((t) => t.type === 'INGRESO').reduce((sum, t) => sum + t.amount, 0),
  )

  const totalExpenses = computed(() =>
    transactions.value.filter((t) => t.type === 'GASTO').reduce((sum, t) => sum + t.amount, 0),
  )

  const balance = computed(() =>
    transactions.value.reduce(
      (sum, t) => (t.type === 'INGRESO' ? sum + t.amount : sum - t.amount),
      0,
    ),
  )

  // Actions
  const fetchTransactions = async () => {
    loading.value = true
    try {
      const { data: items } = await publicClient.models.Transaction.list({
        filter: {
          // Aquí puedes agregar filtros si los necesitas
        },
      })

      // Ordenar manualmente después de obtener los datos
      transactions.value = (items as unknown as Transaction[]).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
    } catch (err) {
      error.value = 'Error al cargar transacciones'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const createTransaction = async (
    transactionData: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    loading.value = true
    try {
      const { data: newTransaction } = await authClient.models.Transaction.create(transactionData)
      await fetchTransactions() // Refetch to ensure consistency
      return newTransaction
    } catch (err) {
      error.value = 'Error al crear transacción'
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTransaction = async (
    id: string,
    transactionData: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>,
  ) => {
    loading.value = true
    try {
      const { ...updateData } = transactionData
      const { data: updatedTransaction } = await authClient.models.Transaction.update({
        id,
        ...updateData,
      })
      await fetchTransactions() // Refetch to ensure consistency
      return updatedTransaction
    } catch (err) {
      error.value = 'Error al actualizar transacción'
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTransaction = async (id: string) => {
    loading.value = true
    try {
      await authClient.models.Transaction.delete({ id })
      await fetchTransactions() // Refetch to ensure consistency
    } catch (err) {
      error.value = 'Error al eliminar transacción'
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    transactions,
    loading,
    error,

    // Computed
    totalIncome,
    totalExpenses,
    balance,

    // Actions
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
})
