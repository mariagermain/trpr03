<script setup lang="ts">
import { useProfileStore } from '@/stores/profileStore';
import ChangeNameForm from '@/components/ChangeNameForm.vue';
import { ref } from 'vue';

const PROFILE_STORE = useProfileStore()

const changeNameForm = ref()

let name = PROFILE_STORE.name
let email = PROFILE_STORE.email

function onClickChangeName(){
    changeNameForm.value.show()
}
</script>

<template>
    <h1>paramètre du compte :</h1>
    <div><strong>Nom de l'utilisateur : </strong> {{ name }}</div>
    <div><strong>Email de l'utilisateur : </strong>{{ email }}</div>
    <input type="button" value="Modifier le nom d'utilisateur" class="btn btn-primary" @click="onClickChangeName()">
    <input type="button" value="modifier le mot de passe" class="btn btn-primary">

    <changeNameForm ref="changeNameForm"/>
</template>

<style>
</style>