
export type Category = {
    id : number,
    value : string
}

export type Question = {
    id : number,
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
    role: number,
    isHandRaised : boolean
}

export type Student = {
    id : number,
    email: string,
    name: string,
    isHandRaised : boolean
}