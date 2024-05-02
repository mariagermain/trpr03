<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppService from '../../AppService';
import CategoryForm from '../components/CategoryForm.vue'

const APP_SERVICE : AppService = new AppService();
const router = useRouter();

function submitCategory(categoryName : string) : void {
    APP_SERVICE.createCategory(categoryName);
    router.push({ name : "Teacher"})
}
</script>

<template>
  <div class="home">
    <h1>Créer une catégorie</h1>
    <Suspense>
        <CategoryForm @submit-category="submitCategory"/>
    </Suspense>
  </div>
</template>

<style scoped></style>