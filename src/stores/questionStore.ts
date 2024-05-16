import QuestionList from "@/components/QuestionList.vue"
import type { Question } from "@/scripts/Types"
import { questionService } from "@/services/questionService"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const useQuestionStore = defineStore('questionStoreId', () => {

    const questionsList:Ref<Question[]> = ref([])
    const loadError:Ref<boolean> = ref(false)

    async function loadQuestions(){
        loadError.value = false
        try {
                questionsList.value = await questionService.getAllQuestions()
        } catch(error){
            loadError.value = true
        }
    }

    async function deleteQuestion(id:number){
        loadError.value = false
        try {
            await questionService.deleteQuestion(id)
        } catch(error){
            loadError.value = true
        }
    }

    async function createQuestion(studentId : number, studentName : string, value : string, category : string, priority : string){
        loadError.value = false
        try {
            await questionService.createQuestion(studentId, studentName,value, category, priority )
        } catch(error){
            loadError.value = true
        }
    }


    return {
        questionsList,
        loadError,

        loadQuestions,
        deleteQuestion,
        createQuestion
    }
})