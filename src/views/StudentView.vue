<script setup lang="ts">
import { onMounted, computed, type Ref, ref } from 'vue'
import { useProfileStore } from '../stores/profileStore'
import StudentActions from '../components/StudentActions.vue'
import { useRouter } from 'vue-router';
import AppService from '../services/AppService';
import TeacherDetails from '../components/TeacherDetails.vue'
import type { UserData } from '@/scripts/Types';

const router = useRouter();
const profileStore = useProfileStore()
const APP_SERVICE = new AppService()
const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const onError = computed(() => profileStore.onError)

const teacher : Ref<UserData> = ref(await APP_SERVICE.getTeacher());
  
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

let manageLifeIsLoading : Ref<boolean> = ref(false);

function writeQuestion() : void{
  router.push({ name : 'AskQuestion' })
}

async function manageTeacherLife(life : number){
    manageLifeIsLoading.value = true;
    await APP_SERVICE.addLifeToUser(teacher.value.id, teacher.value.life + life)
    teacher.value = await APP_SERVICE.getTeacher();
    manageLifeIsLoading.value = false;
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