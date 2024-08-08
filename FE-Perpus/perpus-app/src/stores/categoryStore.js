import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '../services/api'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue3-toastify'

export const useCategoryStore = defineStore('categoryStore', () => {
  const authStore = useAuthStore()
  const currentCategory = ref(null)
  const categories = ref([])
  const validationErrors = ref({})
  const totalCategory = ref(0);
  const loading = ref(false)
  const resetValidationErrors = () => {
    validationErrors.value = {}
  }

  const fecthCategory = async () => {
    loading.value = true
    try {
      const { data } = await apiClient.get('/category', {})
      categories.value = data.data
      totalCategory.value = categories.value.length;
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

  const createCategory = async (input) => {
    resetValidationErrors()
    try {
      const { name } = input
      const { data } = await apiClient.post(
        '/category',
        {
          name
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.tokenUser}`
          }
        }
      )

      toast.success(data.message, {
        theme: 'colored',
        pauseOnHover: false,
        autoClose: 2000,
      })
      await fecthCategory()
    } catch (error) {
      if (error.response && error.response.status === 422) {
        validationErrors.value = error.response.data.errors
      }
    }
  }

  const updateCategory = async (id, input) => {
    resetValidationErrors()
    try {
      const { data } = await apiClient.post(`/category/${id}?_method=PUT`, input, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`
        }
      })
      const index = categories.value.findIndex((category) => category.id === id)
      if (index !== -1) {
        categories.value[index] = data.data
      }
      toast.success(data.message, {
        theme: 'colored',
        pauseOnHover: false,
        autoClose: 2000,
      })
      await fecthCategory()
    } catch (error) {
      if (error.response && error.response.status === 422) {
        validationErrors.value = error.response.data.errors
      }
    }
  }

  const deleteCategory = async (id) => {
    try {
      resetValidationErrors()
      const token = authStore.tokenUser
      const { data } = await apiClient.post(
        `/category/${id}?_method=DELETE`,
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
      await fecthCategory()
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
    categories,
    validationErrors,
    loading,
    resetValidationErrors,
    fecthCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    currentCategory,
    totalCategory
  }
})
