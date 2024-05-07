<script setup lang="ts">
import { useProfileStore } from '@/stores/profileStore';

const profileStore = useProfileStore();


const emit = defineEmits(['raise-hand', 'drop-hand', 'write-question'])

function raiseHand() : void{
    emit('raise-hand')
}

function dropHand() : void{
    emit('drop-hand')
}

function writeQuestion() : void{
    emit('write-question')
}

</script>

<template>
    <div class="container border border-dark border-1 rounded w-60">
        <span class="col w-100">
            <h2>Actions</h2>
            <!---<button v-if="!profileStore.isHandRaised" type="button" class="btn btn-primary m-3 mx-auto w-100" id="raise-hand" @click="raiseHand()">Lever la main</button>
            <button type="button" class="btn btn-primary m-3 mx-auto w-100" id="drop-hand" @click="dropHand()">Baisser la main</button>-->
            <button type="button" class="btn btn-primary m-3 mx-auto w-100" id="write-question" @click="writeQuestion()">Écrire une question</button>
        </span>
    </div>
</template>

