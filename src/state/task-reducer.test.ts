import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC} from "../../srcOld/state/todolists-reducer";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {setTodoListsActionCreator} from "./todolists-reducer";

/*test('empty arrays should be added after todoList been set', () => {

    const addedTodolists = [
        {id: '3', title: 'New todoList1', addedDate: '', order: 0},
        {id: '4', title: 'New todoList2', addedDate: '', order: 0}
    ]

    let endState = tasksReducer({}, setTodoListsActionCreator(addedTodolists))
})*/

test('empty arrays should be added after todoList been set', () => {

    const addedTodolists = [
        {id: '3', title: 'New todoList1', addedDate: '', order: 0},
        {id: '4', title: 'New todoList2', addedDate: '', order: 0}
    ]

    let endState = tasksReducer({}, setTodoListsActionCreator(addedTodolists))
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})