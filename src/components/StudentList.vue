<script setup lang="ts">
import { type Ref, ref } from 'vue';
import AppService from '../../AppService';
import type { Student, User } from '@/scripts/Types';
import StudentDetails from './StudentDetails.vue'
import { userService } from '../services/userService'

const emit = defineEmits(['loading-error'])

const APP_SERVICE : AppService = new AppService();

let students : Ref<Student[]> = ref(await APP_SERVICE.getStudents().catch(() => {
    emit('loading-error');
}).then(it => it || []));

let selectedStudent : Ref<Student | undefined> = ref<Student>();

let isLoading : Ref<boolean> = ref(false);


function selectStudent(student : Student){
    selectedStudent.value = student;
    console.log(selectedStudent)
}

async function deleteSelectedStudent(){
    isLoading.value = true;
    //supprimer l'étudiant
    selectedStudent = ref();
    students.value = await APP_SERVICE.getStudents();
    isLoading.value = false;
}



</script>

<template>
    <StudentDetails v-if="selectedStudent != undefined" @delete-student="deleteSelectedStudent" :isLoading="isLoading"
        :name="selectedStudent.name" :email="selectedStudent.email"/>
    
    <div class="container border border-dark border-1 rounded w-60 mt-2">
        <span class="col w-100">
            <h2>Liste des étudiants de la classe</h2>
            <ul id="studentList" class="d-grid">
                <li class="btn btn-outline-primary m-1" v-for="student in students" :key="student.id" @click="selectStudent(student)">
                    <span class="p-3">Nom : {{ student.name }}</span>
                    <img v-if="student.isHandRaised" class="logo" src="../../public/raised-hand.png" alt="main levée">
                </li>
            </ul>
        </span>
    </div>
</template>
<style>

.logo{
    width: 20px;
    height: 20px;
}

</style>
