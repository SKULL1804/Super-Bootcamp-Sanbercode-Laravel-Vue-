import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import apiClient from '@/services/api'
import { toast } from 'vue3-toastify'

export const useAuthStore = defineStore('authStore', () => {
  const router = useRouter()
  const tokenUser = ref(localStorage.getItem('token'))
  const currentUser = ref(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  )
  const validationErrors = ref({})

  const resetValidationErrors = () => {
    validationErrors.value = {}
  }

  const login = async (input) => {
    resetValidationErrors()
    try {
      const { email, password } = input
      const { data } = await apiClient.post('/auth/login', {
        email,
        password
      })

      const { token, user, message } = data

      tokenUser.value = token
      currentUser.value = user

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      toast.success(message, {
        theme: 'colored',
        pauseOnHover: false
      })

      if (user.role.name === 'owner') {
        setTimeout(() => {
          router.push('/owner')
        }, 2000)
      } else {
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 401) {
          const errorMsg = error.response.data.error
          toast.error(errorMsg, {
            theme: 'colored',
            pauseOnHover: false
          })
        } else {
          validationErrors.value = error.response.data.errors
        }
      }
    }
  }

  const register = async (input) => {
    resetValidationErrors()
    try {
      const { name, email, password, password_confirmation } = input
      const { data } = await apiClient.post('/auth/register', {
        name,
        email,
        password,
        password_confirmation
      })

      const { token, user, message } = data
      tokenUser.value = token
      currentUser.value = user

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      toast.success(message, {
        theme: 'colored',
        pauseOnHover: false,
        autoClose: 5000
      })

      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      if (error.response && error.response.data) {
        validationErrors.value = error.response.data.errors
      }
    }
  }

  const me = async () => {
    try {
      const { data } = await apiClient.get('/me', {
        headers: {
          Authorization: `Bearer ${tokenUser.value}`
        }
      })

      const { user } = data
      currentUser.value = user
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      const { data } = await apiClient.post(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenUser.value}`
          }
        }
      )
      const { message } = data
      tokenUser.value = null
      currentUser.value = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')

      toast.success(message, {
        theme: 'colored',
        pauseOnHover: false,
      })

      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    tokenUser,
    currentUser,
    validationErrors,
    login,
    register,
    resetValidationErrors,
    me,
    logout
  }
})
