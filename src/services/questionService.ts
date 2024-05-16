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



export const questionService = {
    deleteQuestion,
    getAllQuestions
}