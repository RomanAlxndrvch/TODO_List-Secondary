import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8fc044d8-3f5e-469a-b681-136f15cb55d0'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8fc044d8-3f5e-469a-b681-136f15cb55d0'
    }
})
export type TodolistType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    isDone: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists/')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists/', {title: title})
    },
    deleteTodolist(id: string) {
        return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    },
    updateTodolist(id: string, title: string) {
        return axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings)
    },
    getTasks(id: string) {
        return axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}/tasks`, settings)
    }
}