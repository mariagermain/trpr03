<script setup lang="ts">
import { ref, type Ref } from 'vue';
import AppService from '../../AppService';
import QuestionForm from '../components/QuestionForm.vue'
import { useRouter } from 'vue-router';

const APP_SERVICE : AppService = new AppService();
const router = useRouter();

let isLoading : Ref<boolean> = ref(false);

async function submitQuestion(studentName : string, question : string, category : string, priority : string) {
    isLoading.value = true;
    await APP_SERVICE.createQuestion(studentName, question, category, priority);
    router.push({ name : "Student"})
    isLoading.value = false;
}


</script>

<template>
  <div class="home">
    <h1>Écrire une question</h1>
    <Suspense>
        <QuestionForm :isLoading="isLoading" @submit-question="submitQuestion"/>
    </Suspense>
  </div>
</template>

<style scoped></style>