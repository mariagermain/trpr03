<script setup lang="ts">
import { ref, type Ref } from 'vue';
import AppService from '../../AppService';
import type { Question } from '@/scripts/Types';

const APP_SERVICE = new AppService();

let questions : Ref<Question[]> = ref(await APP_SERVICE.getQuestions());

</script>

<template>

    <div class="container border border-dark border-1 rounded w-60">
        <span class="col w-100">
            <h2>Liste des questions</h2>
            <ul id="questionList" class="d-grid">
                <li class="btn btn-outline-primary m-1" v-for="question in questions" :key="question.id" @click="">
                     {{ question.priority }} 
                </li>
            </ul>
        </span>
    </div>

</template>

<style scoped></style> 