import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'
import { authService } from '../services/authService'
import jwtDecode from 'jwt-decode'

interface DecodedToken {
  sub: string
  exp: number
}

export const useAuthStore = defineStore('authStoreId', () => {
  const token = ref('')
  const role:Ref<number> = ref(0)
  const authServiceError = ref('')

  const isLoggedIn = computed(() => !!token.value)

  const getUserId = computed(() => {
    if (!token.value) return ''
    const payload: DecodedToken = jwtDecode(token.value)
    return payload.sub
  })

  const isTokenExpired = computed(() => {
    if (!token.value) return true
    const payload: DecodedToken = jwtDecode(token.value)
    const now = new Date().getTime() / 1000
    return payload.exp < now
  })

  function clearError() {
    authServiceError.value = ''
  }

  function logout() {
    token.value = ''
    role.value = 0
    localStorage.removeItem('token')
  }

  function loadPersistedToken() {
    const storedToken = localStorage.getItem('token')
    if (storedToken) token.value = storedToken
  }

  async function login(credential: { email: string; password: string }) {
    try {
      clearError()
      const loginInfos = await authService.getToken(credential)
      if (loginInfos) {
        token.value = loginInfos.token
        role.value = loginInfos.user.role
        localStorage.setItem('token', token.value)
      }
    } catch (error: any) {
      authServiceError.value = error.message || 'Unknown error'
    }
  }

  function refreshToken() {
    logout()  // Simplified action for token refresh: logs out the user
  }

  return { 
    token,
    role,
    authServiceError,
    isLoggedIn,
    getUserId,
    isTokenExpired,
    clearError,
    logout,
    loadPersistedToken,
    login,
    refreshToken
  }
})