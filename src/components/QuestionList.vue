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
        </span>
    </div>

    <div class="container border border-dark border-1 rounded w-60 mt-2">
        <span class="col w-100">
            <h2>Liste des questions</h2>
            <ul id="questionList" class="d-grid">
                <li class="btn btn-outline-primary m-1" v-for="question in questions" :key="question.id" @click="selectQuestion(question)">
                     {{ question.priority }} - {{ question.category }}
                </li>
            </ul>
        </span>
    </div>
</template>

<style scoped></style> 