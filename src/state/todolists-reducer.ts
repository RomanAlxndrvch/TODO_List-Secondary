import {FilteredValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistsActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
type AddTodolistsActionType = {
    type: 'ADD-TODOLIST',
    title: string
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
            return state.filter(el => el.id !== action.id)
        }

        case "ADD-TODOLIST": {
            return [...state, {id: v1(), title: action.title, filter: "all"}]
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


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistsActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (todolistId: string): AddTodolistsActionType => {
    return {type: "ADD-TODOLIST", title: todolistId}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistsTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}

export const ChangeTodolistFilterAC = (id: string, filter: FilteredValuesType): ChangeTodolistsFiltreActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}



