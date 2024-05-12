<script setup lang="ts">
import { ref, type Ref } from "vue";
import ErrorList from '../components/ErrorList.vue'

defineProps({
    isLoading : Boolean
})

const emit = defineEmits(['submit-category'])

// Formulaire
let categoryName : string = "";


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
        <ErrorList title="Impossible de créer une catégorie." :errors="errorList"></ErrorList>
        <div class="form-group pb-3">
            <input type="text" v-model="categoryName" class="form-control" placeholder="Nouvelle catégorie"></input>
        </div>
        <div v-if="isLoading" class="loader mx-auto"></div>
        <button v-if="!isLoading" type="button" @click="submitCategory()" class="btn btn-primary w-100">Créer une nouvelle catégorie</button>
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