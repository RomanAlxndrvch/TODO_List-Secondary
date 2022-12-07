import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {AppDispatch, AppRootStateType} from "./store";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model: UpdateDomainTaskType
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>
    todoListId: string
}


export type TasksActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoListsActionType |
    SetTasksActionType

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
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            return ({...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]})
        }
        case "UPDATE-TASK": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(el => {
                    return el.id === action.taskId ? {...el, ...action.model} : el
                })
            }
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
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

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (todoListId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {
        type: "SET-TASKS",
        todoListId,
        tasks
    }
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

export type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
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
export const deleteTaskTC2 = (todoListId: string, taskId: string) => async (dispatch: AppDispatch) => {
    await todolistsAPI.deleteTask(todoListId, taskId)
    await dispatch(removeTaskAC(taskId, todoListId));
}
