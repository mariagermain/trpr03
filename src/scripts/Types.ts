
export type Category = {
    id : number,
    value : string
}

export type Question = {
    id : number,
    value : string,
    priority : string,
    category : string
}

export type User = {
    id : number,
    email: string,
    password: string,
    name: string,
    role: number,
    students: number[]
}