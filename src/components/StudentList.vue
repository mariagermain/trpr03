<script setup lang="ts">
import { type Ref, ref, computed } from 'vue';
import AppService from '../services/AppService';
import type { UserData } from '@/scripts/Types';
import StudentDetails from './StudentDetails.vue'
import { useStudentStore } from '@/stores/studentStore';

const emit = defineEmits(['loading-error', 'add-student'])

const STUDENT_STORE = useStudentStore()
await STUDENT_STORE.loadStudents().catch(() => {emit('loading-error')})

let raisedHands = computed(() => {return STUDENT_STORE.raisedHands});

let students = computed(() => {return STUDENT_STORE.studentsList});

let selectedStudent = ref();

let deleteIsLoading : Ref<boolean> = ref(false);
let manageLifeIsLoading : Ref<boolean> = ref(false);


function selectStudent(student : UserData){
    selectedStudent.value = student;
}

async function deleteSelectedStudent(){
    deleteIsLoading.value = true;
    await STUDENT_STORE.deleteStudent(selectedStudent.value.id);
    await STUDENT_STORE.loadStudents()
    selectedStudent = ref();
    deleteIsLoading.value = false;
}

async function manageLifeToSelectedStudent(life : number){
    manageLifeIsLoading.value = true;
    await STUDENT_STORE.addLifeToStudent(selectedStudent.value.id, selectedStudent.value.life + life)
    manageLifeIsLoading.value = false;
}

function addStudent(){
    emit('add-student')
}

</script>

<template>
    <StudentDetails v-if="selectedStudent != undefined" @delete-student="deleteSelectedStudent()" 
    @add-life="manageLifeToSelectedStudent(1)" @supp-life="manageLifeToSelectedStudent(-1)"
    :deleteIsLoading="deleteIsLoading" :manageLifeIsLoading="manageLifeIsLoading"
        :name="selectedStudent.name" :email="selectedStudent.email" :life="selectedStudent.life"/>
    
    <div class="container border border-dark border-1 rounded w-60 mt-2">
        <span class="col w-100">
            <h2>Liste des étudiants de la classe</h2>
            <ul id="studentList" class="d-grid">
                <li class="btn btn-outline-primary m-1" v-for="student in students" :key="student.id" @click="selectStudent(student)">
                    <span class="p-3">Nom : {{ student.name }}</span>
                    <img v-if="raisedHands.includes(student.id)" class="logo" src="../../public/raised-hand.png" alt="main levée">
                </li>
            </ul>
        </span>
        <button type="button" class=" btn btn-primary m-3 mx-auto w-100" id="add-student" @click="addStudent()">Ajouter un étudiant</button>
    </div>


</template>
<style>

.logo{
    width: 20px;
    height: 20px;
}

</style>
