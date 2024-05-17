<script setup lang="ts">
import type { Question } from '@/scripts/Types';
import { computed, ref, type Ref } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import { useQuestionStore } from '@/stores/questionStore';


const emit = defineEmits(['write-question', 'see-questions', 'loading-error'])

// QUESTION STORE
const QUESTION_STORE = useQuestionStore()
await QUESTION_STORE.loadQuestions()
if (QUESTION_STORE.loadError) emit('loading-error')

const profileStore = useProfileStore()

let questions = computed(() => {return QUESTION_STORE.questionsList})

let isLoading : Ref<boolean> = ref(false);

    function writeQuestion() : void{
    emit('write-question')
}

async function deleteQuestion(question : Question){
    isLoading.value = true;
    await QUESTION_STORE.deleteQuestion(question.id)
    await QUESTION_STORE.loadQuestions()
    isLoading.value = false;
}

</script>

<template>
    <div class="container border border-dark border-1 rounded w-60">
        <span class="col w-100">
            <h2>Les questions en cours dans la classe</h2>
            <div v-if="isLoading" class="loader mx-auto"></div>
            <div id="questionList" class="d-grid list-group m-2 mx-auto">
                <div id="question" class="outline-primary m-1 border border-primary rounded mx-auto w-100" v-for="question in questions" :key="question.id">
                    <span class="container row p-1">
                        <div class="col" id="desc">
                            <span class="rounded" :class="question.priority"></span> 
                            {{ question.priority }} - {{ question.category }} - {{ question.studentName }}
                            <div>{{ question.value }}</div>
                        </div>
                        <button v-if="!isLoading && question.studentId == profileStore.id" id="delete-question" class="btn btn-outline-danger col-1" @click="deleteQuestion(question)">
                            <!-- trouvé sur internet-->
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </button>
                    </span>
                </div>
            </div>
            <button type="button" class="btn btn-primary m-3 mx-auto w-100" id="write-question" @click="writeQuestion()">Écrire une question</button>
        </span>
    </div>
</template>

<style scoped>
.loader {
    border: 3px solid #f3f3f3; /* Light grey */
    border-top: 3px solid blue; /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
}

.true {
    border-radius: 3px;
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




