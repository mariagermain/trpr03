<script setup lang="ts">
import { ref, type Ref } from 'vue';


defineExpose({
    show
})

let visible:Ref<boolean> = ref(false)

function show(){
    visible.value = true
}

function onCancel(){
    visible.value = false
}
</script>

<template>
<div class="background" v-if="visible">
    <div class="window">
        <form>
            <input type="text" name="name" id="name">
            <input type="button" value="Changer le nom" class ="btn btn-primary">
            <input type="button" value="Annuler" class="btn btn-danger" @click="onCancel()">
        </form>
    </div>
</div>
</template>

<style scoped>
    .background{
        position: absolute;
        top:0%;
        left:0%;
        background-color: rgba(0, 0, 0, 0.75);
        height: 100%;
        width: ;
    }
    .window{
        position: absolute;
        top: 30%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);

        border:2px solid black;
        border-radius:10px;
        background-color: white;
        padding:10px;
    }

    button{
        margin:10px;
    }
</style>