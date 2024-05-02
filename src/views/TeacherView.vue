<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProfileStore } from '../stores/profileStore'

const profileStore = useProfileStore()

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const role = computed(() => profileStore.role)
const students = computed(() => profileStore.students)
const onError = computed(() => profileStore.onError)

onMounted(async () => {
  try {
    await profileStore.getProfile()
    if (onError.value) {
      // Utilisation d'une boîte de dialogue au lieu de 'confirm'
      confirm("Une erreur s'est produite lors de la récupération du profil de l'utilisateur.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  }
})
</script>

<template>
  <div>
    <h1>Espace Prof</h1>
    <div>Nom: {{ name }}</div>
    <div>Courriel: {{ email }}</div>
    <div>Role: {{ role }}</div>
    <div>
      <h2>Liste des étudiants :</h2>
        <ul>
          <li v-for="student of students">{{ student }}</li>
        </ul>
    </div>
  </div>
</template>

<style scoped></style>