import type { Question } from "@/scripts/Types";
import axios, { type AxiosResponse } from "axios";

const API_URL = 'http://127.0.0.1:3000'
const QUESTIONS_PATH : string = "/questions"

async function deleteQuestion(id:number){
    await axios.delete(API_URL + QUESTIONS_PATH + "/" + String(id));
}

async function getAllQuestions(){
    const { data } : AxiosResponse<Question[], Question[]> = await axios.get(API_URL + QUESTIONS_PATH);
    return data;
}

async function createQuestion (studentId : number, studentName : string, value : string, category : string, priority : string) : Promise<void> {
    await axios.post(API_URL + QUESTIONS_PATH, {studentId: studentId, studentName: studentName, value: value, category: category, priority: priority});
}

export const questionService = {
    deleteQuestion,
    getAllQuestions,
    createQuestion
}