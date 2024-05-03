<script setup lang="ts">
import QuestionList from '../components/QuestionList.vue'

</script>

<template>
  <div class="">
    <h1>Questions des étudiants</h1>
    <Suspense>
        <QuestionList />
    </Suspense>
  </div>
</template>

<style scoped></style>