import {TasksStateType} from "../App";
import {TaskType} from "../List";
import {v1} from "uuid";
import {AddTodolistsActionType, RemoveTodolistsActionType, todoListId1, todoListId2} from "./todolists-reducer";

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
type changeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    payload: {
        taskId: string
        isDone: boolean
        todolistId: string
    }
}
type changeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    payload: {
        taskId: string
        title: string
        todolistId: string
    }
}

type ActionsType =
    RemoveTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistsActionType
    | RemoveTodolistsActionType


const initialState: TasksStateType = {
    [todoListId1]: [
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ],
    [todoListId2]: [
        {id: v1(), title: 'Books', isDone: false},
        {id: v1(), title: 'Milk', isDone: true},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

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
        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        }
        case "CHANGE_TASK_TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }
        }
        case "ADD-TODOLIST":
            return {[action.todolistId]: [], ...state}


        case "REMOVE-TODOLIST": {
            /*  const {[action.todolistId]: restValues, ...newState} = state
              return newState*/

            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default: {
            return state
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

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {
        type: "CHANGE_TASK_STATUS",
        payload: {
            taskId,
            isDone,
            todolistId
        }
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {
        type: "CHANGE_TASK_TITLE",
        payload: {
            taskId,
            title,
            todolistId
        }
    }
}

