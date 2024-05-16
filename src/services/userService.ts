import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import { useProfileStore } from '../stores/profileStore'
import axios, { type AxiosResponse } from 'axios'
import type { Question, User, UserData } from '@/scripts/Types'
import { questionService } from './questionService'

<<<<<<< HEAD
const API_URL = 'http://127.0.0.1:3000'
const DATA_PATH : string = "/usersStats"
const USERS_PATH : string = "/users"
=======
>>>>>>> cbc8c0d0446e98e80b2b91c421453b5806fc0df8

async function updateUserNameAndPassword(newName:string,newPassword:string){
  const PROFILE_STORE = useProfileStore()
  try{
    const response = await axiosAuth.put(API_URL + '/users/' + PROFILE_STORE.id, {id:PROFILE_STORE.id,name:newName, email:PROFILE_STORE.email,password:newPassword, role:PROFILE_STORE.role})
    return response.data
  }
  catch(error){
    throw(parseAxiosError(error))
  }
}
async function getUserById (userId) {
  try {
    // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
    // voir le fichier src/shared/axiosAuth.js
    const response = await axiosAuth.get(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      API_URL + `/users/${userId}`
    )

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function getUserLife (id : number) : Promise<number> {
  const { data }  = await axios.get(API_URL + '/usersStats/' + String(id));
  return data.life;
}

async function getAllStudents() {
  let students : UserData[] = [];
  const { data } : AxiosResponse<User[], User[]> = await axios.get(API_URL + '/users');
  const studentUsers : User[] = data.filter((u : User) => u.role == 2);

  for(const su of studentUsers) {
      let life = await userService.getUserLife(su.id)
      students.push({
          id: su.id,
          email: su.email,
          name: su.name,
          life: life
      })
  }

  return students;
}

async function getRaisedHands () : Promise<number[]> {
  const raisedHands : number[]= [];
  const { data } : AxiosResponse<Question[], Question[]> = await axios.get(API_URL + '/questions');
  data.forEach((q : Question) => { raisedHands.push(q.studentId) });
  return raisedHands;
}

async function deleteStudent (id) : Promise<void> {
  // On supprime les questions de l'étudiant 
  let questions = await questionService.getAllQuestions()
  questions = questions.filter((q : Question) => q.studentId == id);
  for (const q of questions) {
      await questionService.deleteQuestion(q.id);
  }

  // On supprime ses données (vie)
  await axios.delete(API_URL + DATA_PATH + "/" + String(id));

  // On supprime l'étudiant
  await axios.delete(API_URL + USERS_PATH + "/" + String(id));
}

async function addLifeToUser (id : number, life: number) : Promise<void> {
  await axios.put(API_URL + DATA_PATH + "/" + String(id), { id: id, life: life});
}

export const userService = {
  getUserById,
  updateUserNameAndPassword,
  getUserLife,
  getAllStudents,
  getRaisedHands,
  deleteStudent,
  addLifeToUser
}
