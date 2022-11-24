export type TodosDocument = {
    id?: number
    name: string
    description: string
    user_id?: number
    created?: string
    updated?: string
    status?: boolean
}

export type TUser = {
    email: "string"
    password: "string"
}