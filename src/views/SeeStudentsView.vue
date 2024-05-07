<script setup lang="ts">
import { ref, type Ref } from 'vue';
import StudentList from '../components/StudentList.vue'
import ErrorMsg from '../components/ErrorMsg.vue'
import { useRouter } from 'vue-router';

let showLoadingError : Ref<boolean> = ref(false);
const ROUTER = useRouter();

function loadingError(){
    showLoadingError.value = true;
}

function addStudent() : void {
  ROUTER.push({ name : 'AddStudent'})
}

</script>

<template>
  <div class="">
    <h1>Étudiants de la classe</h1>
    <ErrorMsg :show="showLoadingError" message="Impossible de contacter l'API et de consulter les étudiants de la classe."></ErrorMsg>
    <Suspense>
        <StudentList v-if="!showLoadingError" @loading-error="loadingError" @add-student="addStudent()"/>
    </Suspense>
  </div>
</template>

<style scoped></style>