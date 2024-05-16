<script setup lang="ts">
import type { Category } from "../scripts/Types.ts";
import { computed, ref, type Ref } from "vue";
import ErrorList from '../components/ErrorList.vue'
import { useProfileStore } from "@/stores/profileStore.js";
import { useCategoryStore } from "@/stores/CategoryStore.js";

defineProps({
    isLoading : Boolean
})
const emit = defineEmits(['loading-error', 'submit-question'])

const CATEGORY_STORE = useCategoryStore();
await CATEGORY_STORE.loadCategories()
if (CATEGORY_STORE.loadError) emit('loading-error')

const PROFILE_STORE = useProfileStore();

// Formulaire
let studentId : number = PROFILE_STORE.id;
let studentName : string = PROFILE_STORE.name;

let question : string = "";
let category : Category;
let priority : string;

let categories = computed(() => {return CATEGORY_STORE.categoriesList})

const priorities : string[] = ['P1', 'P2', 'P3', 'P4', 'P5'];

// Erreurs
let errorList : Ref<string[]> = ref([]);

function submitQuestion() : void{
    if (validateForm()) 
        emit('submit-question', studentId, studentName, question, category.value, priority);
}


function validateForm() {
    errorList.value = [];
    
    if (question.trim().length <= 0)
        errorList.value.push("La question ne peut pas être vide.") ;
    
    if (category == undefined || category == null) 
        errorList.value.push("Veuillez choisir une catégorie.");

    if (priority == undefined || priority == null) 
        errorList.value.push("Veuillez choisir une priorité.");
    
    return errorList.value.length == 0;
}
</script>

<template>
    <form class="form-outline w-50 mx-auto border border-secondary rounded p-3">
        <ErrorList title="Impossible de poser une question." :errors="errorList"></ErrorList>
        <div class="form-group pb-3">
            <input name="question" type="text" v-model="question" class="form-control" placeholder="Description courte"></input>
        </div>
        <div class="form-group pb-3">
            <label for="select-category">Catégorie:</label>
            <select class="form-select" id="select-category" name="select-category" v-model="category">
                <option v-for="c in categories" :key="c.id" v-bind:value="{id : c.id, value : c.value}">{{ c.value }}</option>
            </select>
        </div>
        <div class="form-group pb-3">
            <label for="select-priority">Priorité:</label>
            <select class="form-select" id="select-priority" name="select-priority" v-model="priority">
                <option v-for="p in priorities" :key="p" v-bind:value="p">{{ p }}</option>
            </select>
        </div>
        <div v-if="isLoading" class="loader m-1 mx-auto"></div>
        <button v-if="!isLoading"type="button" @click="submitQuestion()" class="btn btn-primary w-100">Poser une question</button>
    </form>
</template>

<style scoped>

/*Nous avons trouvé le CSS sur internet*/
/*https://www.w3schools.com/howto/howto_css_loader.asp*/
.loader {
    border: 2px solid #f3f3f3; /* Light grey */
    border-top: 2px solid blue; /* Blue */
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>