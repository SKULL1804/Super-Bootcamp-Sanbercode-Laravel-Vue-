import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import { useBooksStore } from '@/stores/bookStore'
import { toast } from 'vue3-toastify'

export const useBorrowsStore = defineStore('borrowsStore', () => {
  const authStore = useAuthStore()
  const booksStore = useBooksStore()
  const borrows = ref([])
  const currentBorrow = ref(null)
  const validationErrors = ref({})
  const loading = ref(false)

  const resetValidationErrors = () => {
    validationErrors.value = {}
  }

  const fetchBorrows = async () => {
    loading.value = true
    try {
      const { data } = await apiClient.get('/borrow', {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`
        }
      })
      borrows.value = data.data
    } catch (error) {
      console.error('Gagal mengambil daftar borrows:', error)
      toast.error('Gagal mengambil daftar borrows.', {
        theme: 'colored',
        pauseOnHover: false
      })
    } finally {
      loading.value = false
    }
  }

  const history = async (id) => {
    loading.value = true
    try {
      const { data } = await apiClient.get(`/history/${id}`, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`
        }
      })
      borrows.value = data.data 
    } catch (error) {
      console.error('Gagal mengambil daftar borrows:', error)
      toast.error('Gagal mengambil daftar borrows.', {
        theme: 'colored',
        pauseOnHover: false
      })
    } finally {
      loading.value = false
    }
  }

  const createOrUpdateBorrows = async (input) => {
    resetValidationErrors()
    loading.value = true
    try {
      const { data } = await apiClient.post('/borrow', input, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`
        }
      })

      const bookIndex = booksStore.books.findIndex((book) => book.id === input.book_id)
      if (bookIndex !== -1 && booksStore.books[bookIndex].stok > 0) {
        booksStore.books[bookIndex].stok -= 1
        await booksStore.fetchBook();
      }
      toast.success(data.message, {
        theme: 'colored',
        pauseOnHover: false,
        autoClose: 2000
      })
    } catch (error) {
      if (error.response && error.response.status === 422) {
        validationErrors.value = error.response.data.errors
      }
    } finally {
      loading.value = false
    }
  }

  const returnBook = async (borrowId) => {
    loading.value = true
    try {
      const { data } = await apiClient.post(`/borrow/${borrowId}/return`, {}, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`,
        },
      });

      const borrow = borrows.value.find(borrow => borrow.id === borrowId);
      if (borrow) {
        const bookIndex = booksStore.books.findIndex((book) => book.id === borrow.book_id);
        if (bookIndex !== -1) {
          booksStore.books[bookIndex].stok += 1;
          await booksStore.fetchBook();
        }
      }

      toast.success(data.message, {
        theme: 'colored',
        pauseOnHover: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Gagal mengembalikan buku:', error);
      toast.error('Gagal mengembalikan buku.', {
        theme: 'colored',
        pauseOnHover: false,
      });
    } finally {
      loading.value = false
    }
  };

  return {
    borrows,
    currentBorrow,
    loading,
    resetValidationErrors,
    createOrUpdateBorrows,
    fetchBorrows,
    returnBook,
    history,
  }
})
