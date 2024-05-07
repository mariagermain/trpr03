<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProfileStore } from '../stores/profileStore'
import StudentActions from '../components/StudentActions.vue'
import { useRouter } from 'vue-router';
import AppService from '../../AppService';

const APP_SERVICE : AppService = new AppService();
const router = useRouter();
const profileStore = useProfileStore()

const id = computed(() => profileStore.id)
const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const role = computed(() => profileStore.role)
const isHandRaised = computed(() => profileStore.isHandRaised)
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

function raiseHand() : void{
  APP_SERVICE.raiseHand(id.value);
}

function dropHand() : void{
  APP_SERVICE.dropHand(profileStore.id);
}

function writeQuestion() : void{
  router.push({ name : 'AskQuestion' })
}
</script>

<template>
  <div>
    <h1>Espace étudiant</h1>
    <div>Nom: {{ name }}</div>
    <div>Courriel: {{ email }}</div>
    <div>Role: {{ role }}</div>
    <div>
        <StudentActions @raise-hand="raiseHand" @drop-hand="dropHand" @write-question="writeQuestion"/>
    </div>
  </div>
</template>

<style scoped></style>