<script setup lang="ts">
import { type Ref, ref } from 'vue';
import AppService from '../../AppService';
import type { Question } from '@/scripts/Types';

const APP_SERVICE : AppService = new AppService();

let questions : Ref<Question[]> = ref(await APP_SERVICE.getQuestions());

let selectedQuestion = ref();

function selectQuestion(question : Question){
    selectedQuestion.value = question;
}

async function deleteSelectedQuestion(){
    APP_SERVICE.deleteQuestion(selectedQuestion.value.id);
    selectedQuestion = ref();
    questions.value = await APP_SERVICE.getQuestions();
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

            <button type="button" class="btn btn-outline-danger m-1" @click="deleteSelectedQuestion()" >Supprimer cette question</button>
        </span>
    </div>

    <div class="container border border-dark border-1 rounded w-60 mt-2">
        <span class="col w-100">
            <h2>Liste des questions</h2>
            <ul id="questionList" class="d-grid">
                <li :class="question.priority"  class="btn btn-outline-primary m-1" v-for="question in questions" :key="question.id" @click="selectQuestion(question)">
                     {{ question.priority }} - {{ question.category }}
                </li>
            </ul>
        </span>
    </div>
</template>

<style scoped>
.P1{
    border: solid 2px red;
    background-color: rgb(255, 0, 0,.1);
}

.P2{
    border: solid 2px orange;
    background-color: rgb(255, 165, 0,.1);
}

.P3{
    border: solid 2px yellow;
    background-color: rgb(255, 255, 0,.1);
}

.P4{
    border: solid 2px greenyellow;
    background-color: rgb(173, 255, 47,.1);
}

.P5{
    border: solid 2px green;
    background-color: rgb(0, 255,0,.1);
}

</style> 