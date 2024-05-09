<script setup lang="ts">
import { useProfileStore } from '@/stores/profileStore';
import ChangeAccountInfosForm from '@/components/ChangeAccountInfosForm.vue';
import { computed, ref } from 'vue';

const PROFILE_STORE = useProfileStore()

const changeAccountInfosForm = ref()

let name = computed(() => PROFILE_STORE.name)
let email = computed(() => PROFILE_STORE.email)

function onClickChangeName(){
    changeAccountInfosForm.value.show()
}
</script>

<template>
    <h1>paramètre du compte :</h1>
    <div><strong>Nom de l'utilisateur : </strong> {{ name }}</div>
    <div><strong>Email de l'utilisateur : </strong>{{ email }}</div>
    <input type="button" value="Modifier le profile" class="btn btn-primary" @click="onClickChangeName()">

    <ChangeAccountInfosForm ref="changeAccountInfosForm"/>
</template>

<style>
</style>