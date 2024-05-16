import { defineStore } from "pinia"
import type { User, UserData } from "../scripts/Types"
import { ref, type Ref } from "vue"
import { userService } from "@/services/userService"

export const useUserStore = defineStore('userStore', () => {

    const teacher:Ref<UserData> = ref({id:0, email:"", name:"", life:0})
    const studentsList:Ref<UserData[]> = ref([])
    const raisedHands:Ref<number[]> = ref([])
    const onError:Ref<boolean> = ref(false)
    

    async function loadUsers(){
        await loadStudents()
        await loadTeacher()
    }

    async function loadStudents(){
        onError.value = false
        try {
            studentsList.value = await userService.getAllStudents() // Récupération des étudiants
            raisedHands.value = await userService.getRaisedHands() // Liste des elèves qui ont des questions
        } catch (error) {
            onError.value = true
        }
    }

    // Certain composant n'on besoin que des élèves, et d'autre seulement des profs. donc on peut les charger séparément pour économiser des ressources.
    async function loadTeacher(){
        onError.value = false
        try {
            teacher.value = await userService.getTeacher()
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

    async function addLifeToUser(id:number, life:number){
        onError.value = false
        try {
            await userService.addLifeToUser(id, life);
            
            if (teacher.value.id == id) teacher.value.life = life

            else {
                for (let i = 0; i < studentsList.value.length; i++ ){
                    if (studentsList.value[i].id == id) studentsList.value[i].life = life
                }
            }
        } catch (error) {
            onError.value = true
        }
    }

    async function registerStudent(name:string, email:string){
        onError.value = false
        try {
            await userService.registerStudent(name, email)
        }catch (error) {
            onError.value = true
        }
    }

    return {
        teacher,
        studentsList,
        raisedHands,
        onError,
        
        loadUsers,
        loadStudents,
        loadTeacher,
        registerStudent,
        deleteStudent,
        addLifeToUser
    }
})