<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProfileStore } from '../stores/profileStore'
import StudentActions from '../components/StudentActions.vue'
import { useRouter } from 'vue-router';
import AppService from '../../AppService';
import TeacherDetails from '../components/TeacherDetails.vue'


const APP_SERVICE : AppService = new AppService();
const router = useRouter();
const profileStore = useProfileStore()

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
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

function writeQuestion() : void{
  router.push({ name : 'AskQuestion' })
}

</script>

<template>
  <div>
    <h1>Espace étudiant</h1>
    <div>Nom: {{ name }}</div>
    <div>Courriel: {{ email }}</div>
    <TeacherDetails/>
    <div>
        <StudentActions @write-question="writeQuestion"/>
    </div>
  </div>
</template>

<style scoped></style>