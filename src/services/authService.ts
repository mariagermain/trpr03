import axios from 'axios'
import { parseAxiosError } from '../shared/parseAxiosError'

async function getToken (credential) {
  try {
    // TODO : utiliser une variable d'environnement pour l'url de l'API REST
    const response = await axios.post('http://127.0.0.1:3000/login', {
      email: credential.email,
      password: credential.password
    })
    console.log(response.data)
    const token = response.data.accessToken
    const user = response.data.user
    return token;
  } catch (error) {
    // Voir la fonction parseAxiosError dans le fichier src/shared/parseAxiosError.js.
    throw parseAxiosError(error)
  }
}

export const authService = {
  getToken
}
