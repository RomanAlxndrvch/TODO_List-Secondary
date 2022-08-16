import {TasksStateType} from "../App";
import {TaskType} from "../List";
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    payload: {
        todolistId: string,
        id: string
    }
}
type addTaskActionType = {
    type: 'ADD_TASK',
    payload: {
        title: string
        todolistId: string
    }

}

type ActionsType = RemoveTaskActionType | addTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            }
        }
        case "ADD_TASK": {
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        default: {
            throw new Error('Wrong Type!')
        }
    }
}

export const removeTaskAC = (todolistId: string, id: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todolistId,
            id
        }
    }

}

export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {type: "ADD_TASK", payload: {title, todolistId}}
}


