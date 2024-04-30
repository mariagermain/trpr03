import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'

export const useProfileStore = defineStore('profileStoreId', () => {
  const email:Ref<string> = ref('')
  const name:Ref<string> = ref('')
  const role:Ref<number> = ref(1)
  const cours:Ref<number[]> = ref([])
  const onError:Ref<boolean> = ref(false)

  function _initializeProfile(profile: { email: string; name: string; role:number; cours:number[] }) {
    email.value = profile.email
    name.value = profile.name
    role.value = profile.role
    cours.value = profile.cours
    onError.value = false
  }

  async function getProfile() {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = authStore.getUserId // Assuming getUserId is a computed or a ref inside authStore
      const profile = await userService.getUserById(userId)
      _initializeProfile(profile)
    } catch (error) {
      onError.value = true
    }
  }

  return { 
    email, 
    name, 
    role,
    cours,
    onError, 
    getProfile 
  }
})
