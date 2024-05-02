<script setup lang="ts">
import QuestionForm from '../components/QuestionForm.vue'


function submitQuestion(studentName : string, question : string, category : string, priority : string) : void {
console.log(studentName)
console.log(question)
console.log(category)
console.log(priority)
// pas encore implémenté
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