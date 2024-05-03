<script setup lang="ts">
import { ref, type Ref } from 'vue';
import QuestionList from '../components/QuestionList.vue'
import ErrorMsg from '../components/ErrorMsg.vue'

let showLoadingError : Ref<boolean> = ref(false);

function loadingError(){
    showLoadingError.value = true;
}

</script>

<template>
  <div class="">
    <h1>Questions des étudiants</h1>
    <ErrorMsg :show="showLoadingError" message="Impossible de contacter l'API et de charger les questions des étudiants."></ErrorMsg>
    <Suspense>
        <QuestionList v-if="!showLoadingError" @loading-error="loadingError"/>
    </Suspense>
  </div>
</template>

<style scoped></style>