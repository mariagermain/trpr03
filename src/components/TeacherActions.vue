<script setup lang="ts">

const emit = defineEmits(['add-student', 'delete-student', 'see-questions', 'delete-question', 'create-question-category'])

function addStudent() : void{
    emit('add-student')
}

function deleteStudent() : void{
    emit('delete-student')
}

function seeQuestions() : void{
    emit('see-questions')
}

</script>

<template>
    <div class="container border border-dark border-1 rounded w-60">
        <span class="col w-100">
            <button type="button" class="btn btn-primary m-3 mx-auto w-100" id="add-student" @click="addStudent()">Ajouter un étudiant à la classe</button>
            <button type="button" class="btn btn-primary m-3 mx-auto w-100" id="delete-student" @click="deleteStudent()">Supprimer un étudiant de la classe</button>
            <button type="button" class="btn btn-primary m-3 mx-auto w-100" id="see-questions" @click="seeQuestions()">Voir les questions des étudiants</button>
            <!--<button type="button" class="btn btn-primary m-3 mx-auto w-100" id="delete-question" @click="deleteQuestions()">Supprimer une des questions des étudiants</button>
            <button type="button" class="btn btn-primary m-3 mx-auto w-100" id="create-question-category" @click="createQuestionCategory()">Créer une catégorie de questions</button>-->
        </span>
    </div>
</template>