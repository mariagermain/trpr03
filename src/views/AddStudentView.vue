<script setup lang="ts">
import { ref, type Ref } from 'vue';
import AddStudentForm from '../components/AddStudentForm.vue'
import { useRouter } from 'vue-router';
import ErrorMsg from '../components/ErrorMsg.vue'
import { useUserStore } from '@/stores/userStore';

const USER_STORE = useUserStore()
const router = useRouter();

let isLoading : Ref<boolean> = ref(false);

let showLoadingError : Ref<boolean> = ref(false);

function loadingError(){
    showLoadingError.value = true;
}

async function registerStudent(name : string, email : string) {
    showLoadingError.value = false;
    isLoading.value = true;
    await USER_STORE.registerStudent(name, email)
    if (USER_STORE.onError) loadingError()

    if( showLoadingError.value == false){
        router.push({ name : "SeeStudents"})
    }
    isLoading.value = false;
}


</script>

<template>
  <div class="home">
    <h1>Ajouter un étudiant à la classe</h1>
    <ErrorMsg :show="showLoadingError" message="Impossible de contacter l'API et d'ajouter un étudiant."></ErrorMsg>
    <Suspense>
        <AddStudentForm v-if="!showLoadingError" @loading-error="loadingError" :isLoading="isLoading" @register-student="registerStudent"/>
    </Suspense>
  </div>
</template>

<style scoped></style>