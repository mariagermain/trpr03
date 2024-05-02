import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

// Vérifie si l'utilisateur est connecter + bon rôle avant de changer de page.
router.beforeEach((to) => {
  const authStore = useAuthStore()
  authStore.loadPersistedToken()

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
  if (to.meta.requiresStudent && (authStore.role != 2 || !authStore.isLoggedIn)){
    return {
      name : 'Home'
    }
  }

  else {
    return true
  }
})

export default router