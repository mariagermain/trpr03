<script setup lang="ts">
import { ref, type Ref } from 'vue';
import AppService from '../services/AppService'
import type { UserData } from '@/scripts/Types';

const APP_SERVICE = new AppService()

const teacher : Ref<UserData> = ref(await APP_SERVICE.getTeacher());

let manageLifeIsLoading : Ref<boolean> = ref(false);
    
async function manageLifeToTeacher(life : number) {
    manageLifeIsLoading.value = true;
    await APP_SERVICE.addLifeToUser(teacher.value.id, teacher.value.life + life)
    teacher.value = await APP_SERVICE.getTeacher();
    manageLifeIsLoading.value = false;
}

</script>

<template>
<div class="container border border-dark border-1 rounded w-60 mb-1">
        <span class="col w-100">
            <h2>Prof: </h2>
            <div>
                Nom: {{ teacher.name }}
            </div>
            <div>
                Courriel: {{ teacher.email }}
            </div>
            <div>
                Vie: <img v-for="i in teacher.life"class="logo" src="../../public/life.png" alt="pt vie">
            </div>

            <div>
                <button v-if="!manageLifeIsLoading && teacher.life > 0" type="button" id="supp-life" class="btn btn-outline-danger m-1" @click="manageLifeToTeacher(-1)">
                    - <img class="logo" src="../../public/life.png" alt="pt vie">
                </button>

                <button v-if="!manageLifeIsLoading && teacher.life < 10" type="button" id="add-life" class="btn btn-outline-success m-1" @click="manageLifeToTeacher(1)">
                    + <img class="logo" src="../../public/life.png" alt="pt vie">
                </button>
                <div v-if="manageLifeIsLoading" class="loader"></div>
            </div>
        </span>
    </div>
</template>

<style>

/*Nous avons trouvé le CSS sur internet*/
/*https://www.w3schools.com/howto/howto_css_loader.asp*/
.loader {
    border: 3px solid #f3f3f3; /* Light grey */
    border-top: 3px solid blue; /* Blue */
    border-radius: 50%;
    width: 28px;
    height: 28px;
    animation: spin 2s linear infinite;
    margin: 9px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.logo{
    width: 20px;
    height: 20px;
}


</style>