import axios, { type AxiosResponse } from 'axios';
import { type Category, type User, type Question, type Student } from "./src/scripts/Types"
import { ref, type Ref } from 'vue';
import { userService } from './src/services/userService'


const CATEGORIES_PATH : string = "/categories"
const QUESTIONS_PATH : string = "/questions"
const USERS_PATH : string = "/users"
const RAISED_HANDS_PATH : string = "/raisedhands"


export default class AppService {
    API_URL : string

    constructor () {
        this.API_URL = 'http://localhost:3000'
    }

    async getCategories () : Promise<Category[]> {
        const { data } : AxiosResponse<Category[], Category[]> = await axios.get(this.API_URL + CATEGORIES_PATH);
        return data;
    }

    async createCategory (category : string) : Promise<void> {
        await axios.post(this.API_URL + CATEGORIES_PATH, {value: category});
    }

    async getQuestions () : Promise<Question[]> {
        const { data } : AxiosResponse<Question[], Question[]> = await axios.get(this.API_URL + QUESTIONS_PATH);
        return data;
    }

    async createQuestion (studentId : number, studentName : string, value : string, category : string, priority : string) : Promise<void> {
        await axios.post(this.API_URL + QUESTIONS_PATH, {studentId: studentId, studentName: studentName, value: value, category: category, priority: priority});
    }

    async deleteQuestion (id : number) : Promise<void> {
        await axios.delete(this.API_URL + QUESTIONS_PATH + "/" + String(id));
    }

    async getUsers () : Promise<User[]> {
        const { data } : AxiosResponse<User[], User[]> = await axios.get(this.API_URL + USERS_PATH);
        return data;
    }

    async raiseHand (id : number) : Promise<void> {
        await axios.post(this.API_URL + RAISED_HANDS_PATH , {id: id});
    }

    async dropHand (id : number) : Promise<void> {
        await axios.delete(this.API_URL + RAISED_HANDS_PATH + "/" + String(id));
    }

    /*async getRaisedHands () : Promise<number[]> {
        const { data } : AxiosResponse<number[], number[]> = await axios.get(this.API_URL + RAISED_HANDS_PATH);
        return data;
    }

    async isHandRaised(id : number) : Promise<boolean>{
        const { data } : AxiosResponse<any[], any[]> = await axios.get(this.API_URL + RAISED_HANDS_PATH);
        return data.includes(id);
    }*/

    async getStudents () : Promise<User[]> {
        const { data } : AxiosResponse<User[], User[]> = await axios.get(this.API_URL + USERS_PATH);
        return data.filter((u : User) => u.role == 2);
    }

    async updateprofile (newName:string, newPassword:string){
        const { data } = await axios.put(this.API_URL + USERS_PATH, {name:newName, password:newPassword})
    }
}
