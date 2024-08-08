import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '../services/api'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue3-toastify'

export const useRoleStore = defineStore('roleStore', () => {
  const authStore = useAuthStore()
  const currentRole = ref(null)
  const roles = ref([])
  const validationErrors = ref({})
  const loading = ref(false)
  const totalRole = ref(0);
  const resetValidationErrors = () => {
    validationErrors.value = {}
  }

  const fecthRole = async () => {
    loading.value = true
    try {
      const { data } = await apiClient.get('/role', {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`
        }
      })
      roles.value = data.data
      totalRole.value = roles.value.length;
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

  const createRole = async (input) => {
    resetValidationErrors()
    try {
      const { name } = input
      const { data } = await apiClient.post(
        '/role',
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
        autoClose: 2000
      })
      await fecthRole()
    } catch (error) {
      if (error.response && error.response.status === 422) {
        validationErrors.value = error.response.data.errors
      }
    }
  }

  const updateRole = async (id, input) => {
    resetValidationErrors()
    try {
      const { data } = await apiClient.post(`/role/${id}?_method=PUT`, input, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`
        }
      })
      const index = roles.value.findIndex((role) => role.id === id)
      if (index !== -1) {
        roles.value[index] = data.data
      }
      toast.success(data.message, {
        theme: 'colored',
        pauseOnHover: false,
        autoClose: 2000
      })
      await fecthRole()
    } catch (error) {
      if (error.response && error.response.status === 422) {
        validationErrors.value = error.response.data.errors
      }
    }
  }

  const deleteRole = async (id) => {
    try {
      resetValidationErrors()
      const token = authStore.tokenUser
      const { data } = await apiClient.post(
        `/role/${id}?_method=DELETE`,
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
      await fecthRole()
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
    currentRole,
    roles,
    validationErrors,
    loading,
    totalRole,
    resetValidationErrors,
    fecthRole,
    createRole,
    updateRole,
    deleteRole
  }
})
