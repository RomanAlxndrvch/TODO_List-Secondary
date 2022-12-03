import {setTodoListsActionCreator, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TodolistType} from "../api/todolists-api";
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {tasksReducer} from "./tasks-reducer";

let startState: Array<TodolistDomainType>

beforeEach(() => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let startState: Array<TodolistDomainType> /*= [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}]*/
})

test('todoLists should set to state', () => {

    const newTodoLists: Array<TodolistType> = [
        {id: '3', title: 'New todoList1', addedDate: '', order: 0},
        {id: '4', title: 'New todoList2', addedDate: '', order: 0}]

    const finalState = todolistsReducer(startState, setTodoListsActionCreator(newTodoLists))

    expect(finalState.length).toBe(2)
    expect(finalState[0].filter).toBe('all')
})



