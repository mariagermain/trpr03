<script setup lang="ts">
import type { Category, Ship } from "../scripts/Types.ts";
import AppService from "../../AppService"
import { useRouter, type Router } from "vue-router";
import { ref, type Ref } from "vue";
import ErrorList from '../components/ErrorList.vue'

const emit = defineEmits(['loading-error', 'submit-category'])
const APP_SERVICE : AppService = new AppService();

// Formulaire
let categoryName : string = "";

let categories : Category[] = await APP_SERVICE.getCategories().catch(() => {
    emit('loading-error');
}).then(it => it || []);

// Erreurs
let errorList : Ref<string[]> = ref([]);

function submitCategory() : void{
    if (validateForm()) 
        emit('submit-category', categoryName);
}


function validateForm() {
    errorList.value = [];
    if (categoryName.trim().length <= 0)
        errorList.value.push("Le nom de la nouvelle catégorie ne peut pas être vide") ;
    
    return errorList.value.length == 0;
}
</script>

<template>
    <form class="form-outline w-50 mx-auto border border-secondary rounded p-3">
        <ErrorList title="Impossible de poser une question." :errors="errorList"></ErrorList>
        <div class="form-group pb-3">
            <input type="text" v-model="categoryName" class="form-control" placeholder="Nouvlle catégorie"></input>
        </div>
        <div class="">
            <button type="button" @click="submitCategory()" class="btn btn-primary w-100">Créer une nouvelle catégorie</button>
        </div>
    </form>
</template>

<style scoped>
</style>