<script setup lang="ts">

const emit = defineEmits(['see-students', 'see-questions', 'create-question-category'])


function seeStudents() : void{
    emit('see-students')
}

function seeQuestions() : void{
    emit('see-questions')
}

function createQuestionCategory() : void{
    emit('create-question-category')
}

</script>

<template>
    <div class="container border border-dark border-1 rounded w-60">
        <span class="col w-100">
            <button type="button" class="btn btn-primary m-3 mx-auto w-100" id="delete-student" @click="seeStudents()">Voir les étudiants de la classe</button>
            <button type="button" class="btn btn-primary m-3 mx-auto w-100" id="see-questions" @click="seeQuestions()">Voir les questions des étudiants</button>
            <button type="button" class="btn btn-primary m-3 mx-auto w-100" id="create-question-category" @click="createQuestionCategory()">Créer une catégorie de questions</button>
        </span>
    </div>
</template>