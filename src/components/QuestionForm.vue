<script setup lang="ts">
import type { Category, Ship } from "../scripts/Types.ts";
import AppService from "../../AppService"
import { useRouter, type Router } from "vue-router";
import { ref, type Ref } from "vue";
import ErrorList from '../components/ErrorList.vue'

const emit = defineEmits(['loading-error', 'submit-question'])
const APP_SERVICE = new AppService();

// Formulaire
let question : string = "";
let category : Category;

let categories : Category[] = await APP_SERVICE.getCategories().catch(() => {
    emit('loading-error');
}).then(it => it || []);


// Erreurs
let errorList : Ref<string[]> = ref([]);

function submitQuestion() : void{
    if (validateForm()) 
        emit('submit-question', question, category.value);
}


function validateForm() {
    errorList.value = [];
    if (question.trim().length <= 0)
        errorList.value.push("La question ne peut pas être vide") ;
    
    if (category == undefined || category == null) 
        errorList.value.push("Veuillez choisir une catégorie.");
    
    return errorList.value.length == 0;
}
</script>

<template>
    <form class="form-outline w-50 mx-auto border border-secondary rounded p-3">
        <ErrorList title="Impossible de poser une question." :errors="errorList"></ErrorList>
        <div class="form-group pb-3">
            <textarea v-model="question" cols="50" rows="6" class="form-control" placeholder="Question"></textarea>
        </div>
        <div class="form-group pb-3">
            <label for="select-category">Catégorie:</label>
            <select class="form-select" id="select-category" v-model="category">
                <option v-for="c in categories" :key="c.value" v-bind:value="{value : c.value}">{{ c.value }}</option>
            </select>
        </div>
        <div class="">
            <button type="button" @click="submitQuestion()" class="btn btn-primary w-100">Poser une question</button>
        </div>
    </form>
</template>

<style scoped>
</style>