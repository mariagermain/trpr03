import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import { useProfileStore } from '../stores/profileStore'



async function updateUserName(newName:string,newPassword:string){
  const PROFILE_STORE = useProfileStore()
  try{
    const response = await axiosAuth.put('http://127.0.0.1:3000/users/' + PROFILE_STORE.id, {id:PROFILE_STORE.id,name:newName, email:PROFILE_STORE.email,password:newPassword, role:PROFILE_STORE.role})
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
      `http://127.0.0.1:3000/users/${userId}`
    )

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

export const userService = {
  getUserById,
  updateUserName
}
