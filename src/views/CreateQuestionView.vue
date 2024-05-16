<script setup lang="ts">
import { ref, type Ref } from 'vue';
import QuestionForm from '../components/QuestionForm.vue'
import { useRouter } from 'vue-router';
import ErrorMsg from '../components/ErrorMsg.vue'
import { useQuestionStore } from '@/stores/questionStore';


const QUESTION_STORE = useQuestionStore()
const router = useRouter();

let isLoading : Ref<boolean> = ref(false);

let showLoadingError : Ref<boolean> = ref(false);

function loadingError(){
    showLoadingError.value = true;
}

async function submitQuestion(studentId : number, studentName : string, question : string, category : string, priority : string) {
    showLoadingError.value = false;
    isLoading.value = true;
    await QUESTION_STORE.createQuestion(studentId, studentName, question, category, priority)
    if (QUESTION_STORE.loadError) loadingError()

    if( showLoadingError.value == false){
        router.push({ name : "Student"})
    }
    isLoading.value = false;
}


</script>

<template>
  <div class="home">
    <h1>Écrire une question</h1>
    <ErrorMsg :show="showLoadingError" message="Impossible de contacter l'API et de créer une question."></ErrorMsg>
    <Suspense>
        <QuestionForm v-if="!showLoadingError" @loading-error="loadingError" :isLoading="isLoading" @submit-question="submitQuestion"/>
    </Suspense>
  </div>
</template>

<style scoped></style>