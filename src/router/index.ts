import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import routes from './routes'
import { useProfileStore } from '@/stores/profileStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

// Vérifie si l'utilisateur est connecter + bon rôle avant de changer de page.
router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const profileStore = useProfileStore()

  authStore.loadPersistedToken()
  await profileStore.getProfile()

  // requiresAuth
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return {
      name: 'Login'
    }
  }

  // /login + connecter = /home 
  if (to.name === 'Login' && authStore.isLoggedIn) {
    return {
      name: 'Home'
    }
  } 
  
  // requiresStudent
  if (to.meta.requiresStudent && (profileStore.role != 2 || !authStore.isLoggedIn)){
    return {
      name : 'Home'
    }
  }

  else {
    return true
  }
})

export default router