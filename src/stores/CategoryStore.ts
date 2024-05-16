import type { Category } from "@/scripts/Types";
import { categoryService } from "@/services/categoryService";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useCategoryStore = defineStore('categoryStore', () => {
    
    const categoriesList:Ref<Category[]> = ref([])
    const loadError:Ref<boolean> = ref(false)

    async function loadCategories(){
        loadError.value = false
        try {
            categoriesList.value = await categoryService.getCategories()
        } catch (error) {
            loadError.value = true
        }
    }

    async function createCategory(category:string){
        loadError.value = false
        try {
            await categoryService.createCategory(category)
        } catch (error) {
            loadError.value = true
        }
    }

    return {
        categoriesList,
        loadError,

        loadCategories,
        createCategory
    }
})