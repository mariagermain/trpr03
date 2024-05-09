<script setup lang="ts">

const emit = defineEmits(['delete-student', 'add-life', 'supp-life'])

const props = defineProps<{
    deleteIsLoading : boolean,
    name : string,
    email : string,
    life : number,
    manageLifeIsLoading : boolean
}>()

function deleteSelectedStudent() : void{
    emit('delete-student')
}

function addLifeToSelectedStudent(): void {
    emit('add-life')
}

function suppLifeToSelectedStudent() : void {
    emit('supp-life')
}

</script>

<template>
<div class="container border border-dark border-1 rounded w-60">
        <span class="col w-100">
            <h2>Détail: </h2>
            <div>
                Nom: {{ props.name }}
            </div>
            <div>
                Courriel: {{ props.email }}
            </div>
            <div>
                Vie: <img v-for="i in $props.life"class="logo" src="../../public/life.png" alt="pt vie">
            </div>

            <div>
                <button v-if="!manageLifeIsLoading && $props.life < 10" type="button" id="add-life" class="btn btn-outline-success m-1" @click="addLifeToSelectedStudent()">
                    + <img class="logo" src="../../public/life.png" alt="pt vie">
                </button>

                <button v-if="!manageLifeIsLoading && $props.life > 0" type="button" id="supp-life" class="btn btn-outline-danger m-1" @click="suppLifeToSelectedStudent()">
                    - <img class="logo" src="../../public/life.png" alt="pt vie">
                </button>
            </div>

            <div v-if="deleteIsLoading || manageLifeIsLoading" class="loader m-1"></div>
            <button v-if="!deleteIsLoading" type="button" id="delete-student" class="btn btn-outline-danger m-1" @click="deleteSelectedStudent()"> Supprimer cet étudiant</button>
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

.logo{
    width: 20px;
    height: 20px;
}


</style>