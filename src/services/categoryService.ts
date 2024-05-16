import type { Category } from "@/scripts/Types";
import type { AxiosResponse } from "axios";
import axios from "axios";

const API_URL = 'http://127.0.0.1:3000'
const CATEGORIES_PATH : string = "/categories"

async function getCategories () : Promise<Category[]> {
    const { data } : AxiosResponse<Category[], Category[]> = await axios.get(API_URL + CATEGORIES_PATH);
    return data;
}

async function createCategory (category : string) : Promise<void> {
    await axios.post(API_URL + CATEGORIES_PATH, {value: category});
}

export const categoryService = {
    getCategories,
    createCategory
}