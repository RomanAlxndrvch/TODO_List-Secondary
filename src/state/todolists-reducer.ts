import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {AppDispatch} from "./store";

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodoListsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                ...action.todoList, filter: "all"
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todoLists.map(el => {
                return {
                    ...el, filter: 'all'
                }
            })
        }
        default:
            return state;
    }
}

// Action creators
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id: id}) as const

export const addTodolistAC = (todoList: TodolistType) => {
    return {type: 'ADD-TODOLIST', todoList} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const setTodoListsActionCreator = (todoLists: Array<TodolistType>) => {
    return {type: "SET-TODOLISTS", todoLists} as const
}

export const fetchTodoListsTC = () => (dispatch: AppDispatch) => {
    todolistsAPI.getTodolists().then(res => {
        dispatch(setTodoListsActionCreator(res.data))
    })
}
export const removeTodoListTC = (id: string) => (dispatch: AppDispatch) => {
    todolistsAPI.deleteTodolist(id).then(res => {
        dispatch(removeTodolistAC(id))
    })
}
export const addTodoListTC = (title: string) => (dispatch: AppDispatch) => {
    todolistsAPI.createTodolist(title).then(res => {
        dispatch(addTodolistAC(res.data.data.item))
    })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: AppDispatch) => {
    todolistsAPI.updateTodolist(id, title).then(res => {
        dispatch(changeTodolistTitleAC(id, title))
    })
}
export type TodoListsActionsType =
    ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodoListsActionCreator>
    | ReturnType<typeof removeTodolistAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}