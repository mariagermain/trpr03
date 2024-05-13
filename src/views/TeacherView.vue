<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProfileStore } from '../stores/profileStore'
import TeacherActions from '../components/TeacherActions.vue'
import { useRouter } from 'vue-router'

const profileStore = useProfileStore()

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const onError = computed(() => profileStore.onError)

const router = useRouter();

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


function seeStudents() : void {
  router.push({ name: 'SeeStudents' })
}

function seeQuestions() : void {
  router.push({ name: 'SeeQuestions' })
}

function createQuestioncategory() : void {
  router.push({ name: 'CreateCategory' })
}

</script>

<template>
  <div>
    <h1>Espace Prof</h1>
    <div>Nom: {{ name }}</div>
    <div>Courriel: {{ email }}</div>
  </div>
  <TeacherActions @see-students="seeStudents" @see-questions="seeQuestions" @create-question-category="createQuestioncategory"/>
</template>

<style scoped></style>