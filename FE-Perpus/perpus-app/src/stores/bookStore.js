import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '../services/api'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue3-toastify'

export const useBooksStore = defineStore('bookStore', () => {
  const authStore = useAuthStore()
  const currentBook = ref(null)
  const books = ref([])
  const validationErrors = ref({})
  const totalBook = ref(0);
  const loading = ref(false)
  const resetValidationErrors = () => {
    validationErrors.value = {}
  }

  const determineIfPopular = (book) => {
    return book.stok > 20
  }

  const getPopularBooks = () => {
    return books.value
      .filter((book) => book.isPopular)
      .sort((a, b) => b.stok - a.stok)
      .slice(0, 3)
  }

  const fetchBook = async () => {
    loading.value = true
    try {
      const { data } = await apiClient.get('/book', {})
      books.value = data.data.map((book) => ({
        ...book,
        isPopular: determineIfPopular(book)
      }))
      totalBook.value = books.value.length;

    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errorMsg = error.response.data.error
        toast.error(errorMsg, {
          theme: 'colored',
          pauseOnHover: false
        })
      }
    } finally {
      loading.value = false
    }
  }
  const fetchBooksByCategory = async (category) => {
    try {
      const { data } = await apiClient.get(`/book?category=${category}`)
      books.value = data.data
    } catch (error) {
      toast.error('Error fetching books', {
        theme: 'colored',
        pauseOnHover: false
      })
    }
  }

  const detailBook = async (id) => {
    resetValidationErrors()
    try {
      const { data } = await apiClient.get(`/book/${id}`)
      currentBook.value = data.data
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errorMsg = error.response.data.error
        toast.error(errorMsg, {
          theme: 'colored',
          pauseOnHover: false
        })
      }
    }
  }

  const createBook = async (input) => {
    resetValidationErrors()
    try {
      const { data } = await apiClient.post('/book', input, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`
        }
      })

      toast.success(data.message, {
        theme: 'colored',
        pauseOnHover: false,
        autoClose: 2000
      })
      await fetchBook()
    } catch (error) {
      if (error.response && error.response.status === 422) {
        validationErrors.value = error.response.data.errors
      }
    }
  }

  const updateBook = async (id, input) => {
    resetValidationErrors()
    try {
      const { data } = await apiClient.post(`/book/${id}?_method=PUT`, input, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`
        }
      })
      const index = books.value.findIndex((book) => book.id === id)
      if (index !== -1) {
        books.value[index] = data.data
      }
      toast.success(data.message, {
        theme: 'colored',
        pauseOnHover: false,
        autoClose: 2000
      })
      await fetchBook()
    } catch (error) {
      if (error.response && error.response.status === 422) {
        validationErrors.value = error.response.data.errors
      }
    }
  }

  const deleteBook = async (id) => {
    try {
      resetValidationErrors()
      const token = authStore.tokenUser
      const { data } = await apiClient.post(
        `/book/${id}?_method=DELETE`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      toast.success(data.message, {
        theme: 'colored',
        pauseOnHover: false,
        autoClose: 5000
      })
      await fetchBook()
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errorMsg = error.response.data.error
        toast.error(errorMsg, {
          theme: 'colored',
          pauseOnHover: false
        })
      }
    }
  }

  return {
    authStore,
    books,
    validationErrors,
    loading,
    currentBook,
    totalBook,
    resetValidationErrors,
    fetchBooksByCategory,
    fetchBook,
    createBook,
    updateBook,
    deleteBook,
    determineIfPopular,
    getPopularBooks,
    detailBook
  }
})
