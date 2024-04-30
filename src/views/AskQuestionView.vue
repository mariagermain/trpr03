<script setup lang="ts">
import QuestionForm from '../components/QuestionForm.vue'


function submitQuestion(question : string, category : string) : void {

}
</script>

<template>
  <div class="home">
    <h1>Écrire une question</h1>
    <Suspense>
        <QuestionForm @submit-question="submitQuestion"/>
    </Suspense>
  </div>
</template>

<style scoped></style>