import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {AppDispatch, AppRootStateType} from "./store";
import {addTodolistAC, removeTodolistAC, setTodoListsActionCreator} from "./todolists-reducer";

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            return ({...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]})
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...el, ...action.model} : el
                )
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoList.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            let stateCopy = {...state}
            action.todoLists.forEach((el) => {
                return stateCopy[el.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            const tasks = {...state}
            tasks[action.todoListId] = action.tasks
            return tasks
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task}) as const

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskType, todolistId: string) => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId} as const
}
export const setTasksAC = (todoListId: string, tasks: Array<TaskType>) => {
    return {type: "SET-TASKS", todoListId, tasks} as const
}

export const setTasksTC = (todoListId: string) => (dispatch: AppDispatch) => {
    todolistsAPI.getTasks(todoListId).then(res => {
        return dispatch(setTasksAC(todoListId, res.data.items))
    })
}
export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: AppDispatch) => {
    todolistsAPI.deleteTask(todoListId, taskId).then(res => {
        dispatch(removeTaskAC(taskId, todoListId))
    })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: AppDispatch) => {
    todolistsAPI.createTask(todolistId, title).then(res => {
        dispatch(addTaskAC(res.data.data.item))
    })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskType, todoListId: string) => (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todoListId].find(el => el.id === taskId)

    if (!task) {
        console.warn('TASK DID NOT FIND IN STATE')
        return
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title: task.title,
        ...domainModel
    }

    const model: UpdateTaskModelType = {...apiModel}
    todolistsAPI.updateTask(todoListId, taskId, model).then(res => {
        dispatch(updateTaskAC(taskId, domainModel, todoListId))
    })
}
///////////////////////////////////////////////////////////////
export type  UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodoListsActionCreator> |
    ReturnType<typeof setTasksAC>
