import {FilteredValuesType, TodoListType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../List";

export type RemoveTodolistsActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type AddTodolistsActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}

export type ChangeTodolistsTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistsFiltreActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilteredValuesType
}

type ActionsType = RemoveTodolistsActionType |
    AddTodolistsActionType |
    ChangeTodolistsTitleActionType |
    ChangeTodolistsFiltreActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.todolistId)
        }

        case "ADD-TODOLIST": {
            let todoList: TodoListType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [todoList, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            else {
                return [...state]
            }
        }

        case "CHANGE-TODOLIST-FILTER": {
            const todoList = state.find(el => el.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }

        default: {
            throw new Error('Wrong Type!')
        }
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistsActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}

export const addTodolistAC = (title: string, todolistId: string): AddTodolistsActionType => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId
    }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistsTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    }
}

export const changeTodolistFilterAC = (filter: FilteredValuesType, id: string): ChangeTodolistsFiltreActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    }
}



