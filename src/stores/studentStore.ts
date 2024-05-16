import { defineStore } from "pinia"
import type { User, UserData } from "./../scripts/Types"
import { ref, type Ref } from "vue"
import { userService } from "@/services/userService"

export const useStudentStore = defineStore('studentStoreId', () => {

    const studentsList:Ref<UserData[]> = ref([])
    const raisedHands:Ref<number[]> = ref([])
    const onError:Ref<boolean> = ref(false)
    
    async function loadStudents(){
        onError.value = false
        try {
            studentsList.value = await userService.getAllStudents() // Récupération des étudiants
            raisedHands.value = await userService.getRaisedHands() // Liste des elèves qui ont des questions
        } catch (error) {
            onError.value = true
        }
    }

    async function deleteStudent(id:string){
        onError.value = false
        try {
            await userService.deleteStudent(id);
        } catch (error) {
            onError.value = true
        }
    }

    async function addLifeToStudent(id:number, life:number){
        onError.value = false
        try {
            await userService.addLifeToUser(id, life);
            
            for (let i = 0; i < studentsList.value.length; i++ ){
                if (studentsList.value[i].id == id) studentsList.value[i].life = life
            }


        } catch (error) {
            onError.value = true
        }
    }

    return {
        studentsList,
        raisedHands,
        onError,
        loadStudents,
        deleteStudent,
        addLifeToStudent
    }
})