import {TasksActionsType, tasksReducer} from './tasks-reducer';
import {TodoListsActionsType, todolistsReducer} from './todolists-reducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkDispatch} from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
type appActionType = TasksActionsType | TodoListsActionsType

export type AppDispatch<ReturnType = void> = ThunkDispatch<AppRootStateType, unknown, appActionType
>
// @ts-ignore
window.store = store;
