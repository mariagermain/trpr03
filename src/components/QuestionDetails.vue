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
            <div v-if="isLoading" class="loader"></div>
            <button v-if="!isLoading" type="button" id="delete-question" class="btn btn-outline-danger m-1" @click="deleteSelectedQuestion()">
                <!--trouvé sur internet-->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
                Supprimer cette question
            </button>
        </span>
    </div>
</template>

<style>

/*Nous avons trouvé le CSS sur internet*/
/*https://www.w3schools.com/howto/howto_css_loader.asp*/
.loader {
    border: 3px solid #f3f3f3; /* Light grey */
    border-top: 3px solid blue; /* Blue */
    border-radius: 50%;
    width: 28px;
    height: 28px;
    animation: spin 2s linear infinite;
    margin: 9px;
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