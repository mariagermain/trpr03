<script setup lang="ts">
import CategoryForm from '../components/QuestionForm.vue'


function submitCategory(categoryName : string) : void {
console.log(categoryName)

// pas encore implémenté
}
</script>

<template>
  <div class="home">
    <h1>Écrire une question</h1>
    <Suspense>
        <CategoryForm @submit-category="submitCategory"/>
    </Suspense>
  </div>
</template>

<style scoped></style>