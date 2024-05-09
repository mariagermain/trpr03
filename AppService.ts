import axios, { type AxiosResponse } from 'axios';
import { type Category, type User, type Question, type Student } from "./src/scripts/Types"
import { ref, type Ref } from 'vue';
import { userService } from './src/services/userService'


const CATEGORIES_PATH : string = "/categories"
const QUESTIONS_PATH : string = "/questions"
const USERS_PATH : string = "/users"
const DATA_PATH : string = "/usersStats"

export default class AppService {
    addLifeToStudent(id: any, life: any) {
        throw new Error('Method not implemented.');
    }
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

    async registerStudent (name : string, email : string) : Promise<void> {
        await axios.post(this.API_URL + USERS_PATH, {name: name, email: email, role: 2, password: 'test'});
        await axios.post(this.API_URL + DATA_PATH, { life: 0 });
    }

    async getRaisedHands () : Promise<number[]> {
        const raisedHands : number[]= [];
        const { data } : AxiosResponse<Question[], Question[]> = await axios.get(this.API_URL + QUESTIONS_PATH);
        data.forEach((q : Question) => { raisedHands.push(q.studentId) });
        return raisedHands;
    }

    async getStudents () : Promise<Student[]> {
        let students : Student[] = [];
        const { data } : AxiosResponse<User[], User[]> = await axios.get(this.API_URL + USERS_PATH);
        const studentUsers : User[] = data.filter((u : User) => u.role == 2);

        for(const su of studentUsers) {
            let life = await this.getUserLife(su.id)
            students.push({
                id: su.id,
                email: su.email,
                name: su.name,
                life: life
            })
        }

        return students;
    }

    async getStudent (id : number) : Promise<Student> {
        const { data } : AxiosResponse<User, User> = await axios.get(this.API_URL + USERS_PATH + "/" + String(id));
        const life = await this.getUserLife(id)
        return {
            id: data.id,
            email: data.email,
            name: data.name,
            life: life
        }
    }
    async deleteStudent (id : number) : Promise<void> {
        // On supprime les questions de l'étudiant 
        let questions = await this.getQuestions()
        questions = questions.filter((q : Question) => q.studentId == id);
        for (const q of questions) {
            await this.deleteQuestion(q.id);
        }

        // On supprime ses données (vie)
        await axios.delete(this.API_URL + DATA_PATH + "/" + String(id));

        // On supprime l'étudiant
        await axios.delete(this.API_URL + USERS_PATH + "/" + String(id));
    }

    async updateName (newName:string) : Promise<void> {
        await axios.put(this.API_URL + USERS_PATH, {name:newName})
    }

    async getUserLife (id : number) : Promise<number> {
        const { data }  = await axios.get(this.API_URL + DATA_PATH + "/" + String(id));
        return data.life;
    }

    async addLifeToUser (id : number, life: number) : Promise<void> {
        await axios.put(this.API_URL + DATA_PATH + "/" + String(id), { id: id, life: life});
    }
}


