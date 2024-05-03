<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppService from '../../AppService';
import CategoryForm from '../components/CategoryForm.vue'
import { ref, type Ref } from 'vue';

const APP_SERVICE : AppService = new AppService();
const router = useRouter();

let isLoading : Ref<boolean> = ref(false);

async function submitCategory(categoryName : string) {
    isLoading.value = true;
    await APP_SERVICE.createCategory(categoryName);
    router.push({ name : "Teacher"})
    isLoading.value = false;
}
</script>

<template>
  <div class="home">
    <h1>Créer une catégorie</h1>
    <Suspense>
        <CategoryForm :isLoading="isLoading" @submit-category="submitCategory"/>
    </Suspense>
  </div>
</template>

<style scoped></style>