import {setTasksAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {addTodolistAC, setTodoListsActionCreator} from "./todolists-reducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
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
})

test('empty arrays should be added after todoList been set', () => {

    const addedTodolists = [
        {id: '3', title: 'New todoList1', addedDate: '', order: 0},
        {id: '4', title: 'New todoList2', addedDate: '', order: 0}
    ]

    let endState = tasksReducer({}, setTodoListsActionCreator(addedTodolists))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['3']).toStrictEqual([])
    expect(endState['4']).toStrictEqual([])
})


test('tasks should be added to todolist ', () => {


    const startTodoLists = {
        'todoListId1': [],
        'todoListId2': []
    }

    let endState = tasksReducer(startTodoLists, setTasksAC('todoListId1', startState["todolistId1"]))


    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(0)
})