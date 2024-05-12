<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { Field, Form, ErrorMessage, validate } from 'vee-validate'
import { useProfileStore } from '@/stores/profileStore';


const PROFILE_STORE = useProfileStore()

let name:string = ""
let password:string=""
let confirmPassword:string=""
let isLoading:Ref<boolean> = ref(false)

defineExpose({
    show
})

let visible:Ref<boolean> = ref(false)

function show(){
    visible.value = true
    isLoading.value = false
    name = ""
    password=""
    confirmPassword = ""

}

function onCancel(){
    visible.value = false
}

async function onValid(){
    const result = await validate({})
    if (!result.valid) return;

    if (PROFILE_STORE.role != 1) name = PROFILE_STORE.name

    isLoading.value = true;
    await PROFILE_STORE.updateProfile(name,password)
    visible.value = false
}

// Validations
const isRequired = value => !value ? 'Ce champ est requis.' : true;
const passwordLength = value => value.length < 4 ? 'Le mot de passe est trop court' : true; 

const samePassword = value => {
    if (value != password){
        return 'les mots de passes ne correspondent pas.'
    }else
        return true;
}
</script>

<template>
<div class="background" v-if="visible">
    <div class="window">
        <Form @submit="onValid">

            <!-- Seul le professeur peut modifier le nom. -->
            <div class="mb-3" v-if="PROFILE_STORE.role == 1">
                <label for="name">Nom d'utilisateur</label>
                <Field
                    class="form-control"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nom d'utilisateur"
                    :rules="isRequired"
                    v-model="name"
                />
                <ErrorMessage class="text-danger" name="name" />
            </div>

            <div class="mb-3">
                <label for="password">Mot de passe</label>
                <Field
                    class="form-control"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    :rules="passwordLength"
                    v-model="password"
                />
                <ErrorMessage class="text-danger" name="password" />
            </div>

            <div class="mb-3">
                <label for="confirm-password">Confirmer le mot de passe</label>
                <Field
                    class="form-control"
                    id="password"
                    name="confirm-password"
                    type="confirm-password"
                    placeholder="Confirmer le mot de passe"
                    :rules="samePassword"
                    v-model="confirmPassword"
                />
                <ErrorMessage class="text-danger" name="confirm-password" />
            </div>

            <div v-if="!isLoading">
                <button type="submit" class="btn btn-primary">Modifier les informations</button>
                <input type="button" value="Annuler" class="btn btn-danger" @click="onCancel()">
            </div>
            <div v-if="isLoading" class="loader m-1"></div>
        </Form>
    </div>
</div>
</template>

<style scoped>
    .background{
        position: absolute;
        top:0%;
        left:0%;
        background-color: rgba(0, 0, 0, 0.75);
        height: 100%;
        width: 100%;
    }
    .window{
        position: absolute;
        top: 30%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);

        border:2px solid black;
        border-radius:10px;
        background-color: white;
        padding:10px;
    }

    input[type=button]{
        margin:10px;
    }

    /*Nous avons trouvé le CSS sur internet*/
    /*https://www.w3schools.com/howto/howto_css_loader.asp*/
    .loader {
        border: 2px solid #f3f3f3; /* Light grey */
        border-top: 2px solid blue; /* Blue */
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 2s linear infinite;
    }
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
</style>