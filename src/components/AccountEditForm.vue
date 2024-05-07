<script setup lang="ts">
import { useProfileStore } from '@/stores/profileStore';

const profileStore = useProfileStore()
let name = profileStore.name
</script>

<template>
    <label for="name">Nouveau nom :</label>
    <input type="text" name="name" id="name" :value="name"/>
    
    <label for="new-password">Nouveau mot de passe :</label>
    <input type="password" name="new-password" id="new-password">

    <label for="confirm-password">Confirmer le mot de passe :</label>
    <input type="password" name="confirm-password" id="confirm-password">

    <button class="btn btn-primary">Confirmer</button>
    <button class="btn btn-danger">Annuler</button>
</template>

<stype scoped>

</stype>