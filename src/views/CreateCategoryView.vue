<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppService from '../services/AppService';
import CategoryForm from '../components/CategoryForm.vue'
import { ref, type Ref } from 'vue';
import ErrorMsg from '../components/ErrorMsg.vue'
import { useCategoryStore } from '@/stores/CategoryStore';

const CATEGORY_STORE = useCategoryStore()
const router = useRouter();

let isLoading : Ref<boolean> = ref(false);

let showLoadingError : Ref<boolean> = ref(false);

function loadingError(){
    showLoadingError.value = true;
}

async function submitCategory(categoryName : string) {
    showLoadingError.value = false;
    isLoading.value = true;
    await CATEGORY_STORE.createCategory(categoryName)
    if (CATEGORY_STORE.loadError) loadingError()

    if(showLoadingError.value == false){
        router.push({ name : "Teacher"})
    }
    isLoading.value = false;
}
</script>

<template>
  <div class="home">
    <h1>Créer une catégorie</h1>
    <ErrorMsg :show="showLoadingError" message="Impossible de contacter l'API et de créer une catégorie."></ErrorMsg>
    <Suspense>
        <CategoryForm :isLoading="isLoading" @submit-category="submitCategory"/>
    </Suspense>
  </div>
</template>

<style scoped></style>