<script setup lang="ts">
import { useProfileStore } from '@/stores/profileStore';
import { ref, type Ref } from 'vue';
import ErrorList from './ErrorList.vue';

const profileStore = useProfileStore()


let errors:Ref<string[]> = ref([])
let name:string = profileStore.name
let password:string = ""
let confirmPassword:string = ""
    
function validateAndSend(){
    if (!validateForm()) return

    // Si le formulaire est valide : on modifie le profile 
    
}

function validateForm():boolean{
    errors.value = []

    if (name.trim().length <= 0)
        errors.value.push("Le nom ne peut pas être vide.")

    if (password.trim().length <= 0)
        errors.value.push("Le mot de passe ne peut pas être vide.")

    if (password != confirmPassword)
        errors.value.push("Les mots de passes ne correspondent pas.")
    
    return errors.value.length == 0
}
</script>

<template>
    <form class="form-outline w-50 mx-auto border border-secondary rounded p-3">
        <ErrorList title="Impossible de modifier le compte." :errors="errors"/>
        <label for="name">Nouveau nom :</label>
        <input v-model="name" type="text" name="name" id="name" >{{ name }}</input>
        
        <label for="new-password">Nouveau mot de passe :</label>
        <input v-model="password" type="password" name="new-password" id="new-password"></input>

        <label for="confirm-password">Confirmer le mot de passe :</label>
        <input v-model="confirmPassword" type="password" name="confirm-password" id="confirm-password"></input>

        <input type="button" class="btn btn-primary" @click="validateAndSend()" value="Confirmer"></input>
    </form>
</template>

<stype scoped>

</stype>