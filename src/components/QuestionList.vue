<script setup lang="ts">
import { type Ref, ref, computed } from 'vue';
import type { Question } from '@/scripts/Types';
import QuestionDetails from './QuestionDetails.vue'
import { useQuestionStore } from '@/stores/questionStore';

const emit = defineEmits(['loading-error'])

const QUESTION_STORE = useQuestionStore()
await loadQuestions()


async function loadQuestions(){
    await QUESTION_STORE.loadQuestions()
    if (QUESTION_STORE.loadError) emit('loading-error')
}

let questions = computed(() => {return QUESTION_STORE.questionsList})

let selectedQuestion = ref();

let isLoading : Ref<boolean> = ref(false);


function selectQuestion(question : Question) {
    selectedQuestion.value = question;
}

async function deleteSelectedQuestion(){
    isLoading.value = true;
    await QUESTION_STORE.deleteQuestion(selectedQuestion.value.id);
    selectedQuestion = ref();
    await loadQuestions();
    isLoading.value = false;
}

</script>
<template>
    <QuestionDetails v-if="selectedQuestion != undefined" @delete-question="deleteSelectedQuestion" :isLoading="isLoading"
        :student="selectedQuestion.studentName" :question="selectedQuestion.value" 
        :category="selectedQuestion.category" :priority="selectedQuestion.priority"/>
    
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