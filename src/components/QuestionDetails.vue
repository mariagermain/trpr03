<script setup lang="ts">

const emit = defineEmits(['delete-question'])

const props = defineProps<{
    isLoading : boolean,
    student : string,
    question : string,
    category  :string,
    priority : string
}>()

function deleteSelectedQuestion() {
    emit('delete-question')
}

</script>

<template>
<div class="container border border-dark border-1 rounded w-60">
        <span class="col w-100">
            <h2>Détail: </h2>
            <div>
                <span class="rounded" :class="props.priority"></span> 
                Priorité: {{ props.priority }}
            </div>
            <div>
                Catégorie: {{ props.category }}
            </div>
            <div>
                Question: {{ props.question }}
            </div>
            <div>
                Étudiant: {{ props.student }}
            </div>
            <div v-if="isLoading" class="loader m-1"></div>
            <button v-if="!isLoading" type="button" id="delete-question" class="btn btn-outline-danger m-1" @click="deleteSelectedQuestion()" >Supprimer cette question</button>
        </span>
    </div>
</template>

<style>

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

.P1{
    height: 10px;
    width:10px;
    border-radius: 50%;
    display: inline-block;
    background-color: red;
}
.P2{
    height: 10px;
    width:10px;
    border-radius: 50%;
    display: inline-block;
    background-color: orange;
}
.P3{
    height: 10px;
    width:10px;
    border-radius: 50%;
    display: inline-block;
    background-color: yellow;
}
.P4{
    height: 10px;
    width:10px;
    border-radius: 50%;
    display: inline-block;
    background-color: greenyellow;
}
.P5{
    height: 10px;
    width:10px;
    border-radius: 50%;
    display: inline-block;
    background-color: green;
}
</style>