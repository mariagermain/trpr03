<script setup lang="ts">
import { type Ref, ref } from 'vue';
import AppService from '../../AppService';
import type { Question } from '@/scripts/Types';

const APP_SERVICE : AppService = new AppService();

let questions : Ref<Question[]> = ref(await APP_SERVICE.getQuestions());

let selectedQuestion = ref();

let isLoading : Ref<boolean> = ref(false);
function selectQuestion(question : Question){
    selectedQuestion.value = question;
}

async function deleteSelectedQuestion(){
    isLoading.value = true;
    await APP_SERVICE.deleteQuestion(selectedQuestion.value.id);
    selectedQuestion = ref();
    questions.value = await APP_SERVICE.getQuestions();
    isLoading.value = false;
}

</script>

<template>
    <div v-if="selectedQuestion != undefined" class="container border border-dark border-1 rounded w-60">
        <span class="col w-100">
            <h2>Détail: </h2>
            <div>
                Priorité: {{ selectedQuestion.priority }}
            </div>
            <div>
                Catégorie: {{ selectedQuestion.category }}
            </div>
            <div>
                Question: {{ selectedQuestion.value }}
            </div>
            <div>
                Étudiant: {{ selectedQuestion.studentName }}
            </div>
            <div v-if="isLoading" class="loader m-1"></div>
            <button v-if="!isLoading" type="button" class="btn btn-outline-danger m-1" @click="deleteSelectedQuestion()" >Supprimer cette question</button>
        </span>
    </div>

    <div class="container border border-dark border-1 rounded w-60 mt-2">
        <span class="col w-100">
            <h2>Liste des questions</h2>
            <ul id="questionList" class="d-grid">
                <li class="btn btn-outline-primary m-1" v-for="question in questions" :key="question.id" @click="selectQuestion(question)">
                    <span class="rounded" :class="question.priority"></span> 
                    {{ question.priority }} - {{ question.category }}
                </li>
            </ul>
        </span>
    </div>
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