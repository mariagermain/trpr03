<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore';


const authStore = useAuthStore()
const profileStore = useProfileStore()
const router = useRouter()



const isLoggedIn = computed(() => authStore.isLoggedIn)

if (!profileStore.profileLoaded && authStore.isLoggedIn) await profileStore.getProfile()
const isStudent = computed(() => {return profileStore.role == 2 && authStore.isLoggedIn})
const isTeacher = computed(() => {return profileStore.role == 1 && authStore.isLoggedIn})

function logout() {
  authStore.logout()
  router.push({
    name: 'Login'
  })
}

</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-nav mr-auto">
        <!-- Le ":class={...}" veut dire si la route est égal à 'Home' alors "active" de bootstrap sera ajoutée à l'attribut "class". Ce qui aura comme effet de mettre en évidence l'option du menu. -->
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'Home' }"
          :to="{ name: 'Home' }"
        >
          Accueil
        </RouterLink>
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'About' }"
          :to="{ name: 'About' }"
        >
          À propos
        </RouterLink>
        
        <RouterLink
        v-if="isTeacher"
          class="nav-link"
          :class="{ active: $route.name == 'Teacher' }"
          :to="{ name: 'Teacher' }"
        >
          Espace prof
        </RouterLink>
        <RouterLink 
          v-if="isStudent"
          class="nav-link"
          :class="{ active: $route.name == 'Student' }"
          :to="{name: 'Student' }"
          >
            Espace étudiant
          </RouterLink>
          <RouterLink
          v-if="isLoggedIn"
            class="nav-link"
            :class="{active: $route.name == 'Settings'}"
            :to="{name: 'Settings'}"
          >
            Paramètre du compte
          </RouterLink>
      </div>
      <div class="d-flex">
        <div class="navbar-nav ml-auto">
          <a class="nav-link" @click="logout" v-if="isLoggedIn" href="#">
            Se déconnecter
          </a>
          <RouterLink
            v-else
            class="nav-link"
            :class="{ active: $route.name == 'Login' }"
            :to="{ name: 'Login' }"
          >
            Connexion
          </RouterLink>

        </div>
      </div>
    </div>
  </nav>
</template>
