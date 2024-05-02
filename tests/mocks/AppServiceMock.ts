import { rest } from 'msw'
import { categories } from '../data/categories'

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
