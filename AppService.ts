import axios, { type AxiosResponse } from 'axios';
import { type Category, type User, type Question } from "./src/scripts/Types"
import { ref, type Ref } from 'vue';


const CATEGORIES_PATH : string = "/categories"
const QUESTIONS_PATH : string = "/questions"
const USERS_PATH : string = "/users"

export default class AppService {
    API_URL : string

    constructor () {
        this.API_URL = 'http://localhost:3000'
    }

    async getCategories () : Promise<Category[]> {
        const { data } : AxiosResponse<Category[], Category[]> = await axios.get(this.API_URL + CATEGORIES_PATH);
        return data;
    }

    /*async getIdForCategory() : Promise<number>{
        const { data } : AxiosResponse<Category[], Category[]> = await axios.get(this.API_URL + CATEGORIES_PATH);
        return data.length + 1;
    }*/

    async createCategory (category : string) : Promise<void> {
        await axios.post(this.API_URL + CATEGORIES_PATH, {value: category});
    }

    async getQuestions () : Promise<Question[]> {
        const { data } : AxiosResponse<Question[], Question[]> = await axios.get(this.API_URL + QUESTIONS_PATH);
        return data;
    }

    async createQuestion (studentName : string, value : string, category : string, priority : string) : Promise<void> {
        await axios.post(this.API_URL + QUESTIONS_PATH, {studentName : studentName, value: value, category:category, priority: priority});
    }

    /*async getIdForQuestion() : Promise<number>{
        const { data } : AxiosResponse<Question[], Question[]> = await axios.get(this.API_URL + QUESTIONS_PATH);
        return data.length + 1;
    }*/

    async deleteQuestion (id : number) : Promise<void> {
        await axios.delete(this.API_URL + QUESTIONS_PATH + "/" + String(id));
    }

    async getUsers () : Promise<User[]> {
        const { data } : AxiosResponse<User[], User[]> = await axios.get(this.API_URL + USERS_PATH);
        return data;
    }

    async getStudents () : Promise<User[]> {
        const { data } : AxiosResponse<User[], User[]> = await axios.get(this.API_URL + USERS_PATH);
        return data.filter((u : User) => u.role == 2);
    }

    async getTeachers () : Promise<User[]> {
        const { data } : AxiosResponse<User[], User[]> = await axios.get(this.API_URL + USERS_PATH);
        return data.filter((u : User) => u.role == 1);
    }

    async updateprofile (newName:string, newPassword:string){
        const { data } = await axios.put(this.API_URL + USERS_PATH, {name:newName, password:newPassword})
    }
}
