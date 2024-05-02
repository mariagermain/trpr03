import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'

export const useProfileStore = defineStore('profileStoreId', () => {
  const profileLoaded:Ref<boolean> = ref(false)
  const email:Ref<string> = ref('')
  const name:Ref<string> = ref('')
  const role:Ref<number> = ref(0)
  const students:Ref<number[]> = ref([])
  const onError:Ref<boolean> = ref(false)

  function _initializeProfile(profile: { email: string; name: string; role:number; students:number[] }) {
    email.value = profile.email
    name.value = profile.name
    role.value = profile.role
    students.value = profile.students
    onError.value = false
    profileLoaded.value = true
  }

  function unloadProfile (){
    email.value = ''
    name.value = ''
    role.value = 0
    students.value = []
    onError.value = false
    profileLoaded.value = false
  }

  async function getProfile() {
    try {
      profileLoaded.value = false
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
    profileLoaded,
    email, 
    name, 
    role,
    students,
    onError, 
    getProfile ,
    unloadProfile
  }
})
