
export type Category = {
    id : number,
    value : string
}

export type Question = {
    id : number,
    studentId : number,
    studentName : string,
    value : string,
    category : string,
    priority : string
}

export type User = {
    id : number,
    email: string,
    password: string,
    name: string,
    role: number
}

export type UserData = {
    id : number,
    email: string,
    name: string,
    life: number
}

