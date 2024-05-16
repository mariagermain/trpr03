import { rest } from 'msw'
import { categories } from '../data/categories'
import { users } from '../data/users';
import { questions } from '../data/questions';
import { userDatas } from '../data/userDatas';

// ATTENTION : UTILISER "localhost" ET NON "127.0.0.1"
const API_URL : string = 'http://localhost:3000';

export const getCategories = [
    rest.get(API_URL + '/categories', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(categories));
    }),
]

export const networkError = [
  rest.get(API_URL + '/*', (req, res, ctx) => {
    return res.networkError('Handler : Failed to connect');
  }),
]

export const getUsers = [
  rest.get(API_URL + '/users', (req, res, ctx) =>{
    return res(ctx.status(200), ctx.json(users));
  }),
]

export const getQuestions = [
  rest.get(API_URL + '/questions', (req, res, ctx) =>{
    return res(ctx.status(200), ctx.json(questions));
  }),
]

export const getTeacher = [
  rest.get(API_URL + '/users', (req, res, ctx) =>{
    return res(ctx.status(200), ctx.json(users[0]));
  })
]

export const getUserLife = [
  rest.get(API_URL + '/users', (req, res, ctx) =>{
    return res(ctx.status(200), ctx.json(2));
  })
]