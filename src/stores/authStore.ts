import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'
import { authService } from '../services/authService'
import jwtDecode from 'jwt-decode'
import { useProfileStore } from './profileStore'

interface DecodedToken {
  sub: string
  exp: number
}

export const useAuthStore = defineStore('authStoreId', () => {
  const token = ref('')
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
    localStorage.removeItem('token')

    // Comme on est déconnecter, on supprime le profil chargé
    const profileStore = useProfileStore()
    profileStore.unloadProfile()
  }

  function loadPersistedToken() {
    const storedToken = localStorage.getItem('token')
    if (storedToken) token.value = storedToken
  }

  async function login(credential: { email: string; password: string }) {
    try {
      clearError()
      const authToken = await authService.getToken(credential)
      if (authToken) {
        token.value = authToken
        localStorage.setItem('token', authToken)
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