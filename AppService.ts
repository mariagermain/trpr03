import axios, { type AxiosResponse } from 'axios';
import { type Category } from "./src/scripts/Types"
import { ref, type Ref } from 'vue';


const CATEGORIES_PATH : string = "/categories"

export default class AppService {
    API_URL : string

    constructor () {
        this.API_URL = 'http://localhost:3000'
    }

    async getCategories () : Promise<Category[]> {
        const { data } : AxiosResponse<Category[], Category[]> = await axios.get(this.API_URL + CATEGORIES_PATH);
        return data;
    }
}
