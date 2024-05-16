<script setup lang="ts">
import { ref, type Ref } from "vue";
import ErrorList from '../components/ErrorList.vue'

defineProps({
    isLoading : Boolean
})
const emit = defineEmits(['loading-error', 'register-student'])

// Formulaire
let name : string = "";
let email : string = "";


// Erreurs
let errorList : Ref<string[]> = ref([]);

function registerStudent() : void{
    if (validateForm()) 
        emit('register-student', name, email);
}


function validateForm() {
    errorList.value = [];
    
    if (name.trim().length <= 0)
        errorList.value.push("Le nom ne peut pas être vide.") ;

    if (email.trim().length <= 0)
        errorList.value.push("Le courriel ne peut pas être vide.") ;
    
    return errorList.value.length == 0;
}
</script>

<template>
    <form class="form-outline w-50 mx-auto border border-secondary rounded p-3">
        <ErrorList title="Impossible d'ajouer un étudiant." :errors="errorList"></ErrorList>
        <div class="form-group pb-3">
            <input type="text" v-model="name" name="name" class="form-control" placeholder="Nom de l'étudiant"></input>
        </div>
        <div class="form-group pb-3">
            <input type="text" v-model="email" name="email" class="form-control" placeholder="Adresse courriel"></input>
        </div>
        <div v-if="isLoading" class="loader m-1 mx-auto"></div>
        <button v-if="!isLoading"type="button" @click="registerStudent()" class="btn btn-primary w-100">Ajouter l'étudiant</button>
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