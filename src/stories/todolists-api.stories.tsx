import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI, UpdateTaskType} from "../api/todolists-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8fc044d8-3f5e-469a-b681-136f15cb55d0'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: 'Roma'})
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(res => {
                return setState(res.data)
            }).catch((err) => {
            console.log(err)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('new title')
            .then(res => {
                return setState(res.data)
            }).catch((err) => {
            console.log(err)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '078a368f-4925-4db8-9e78-a84d5ebbc199'
        todolistsAPI.deleteTodolist(todoListId)
            .then(res => {
                return setState(res.data)
            }).catch((err) => {
            console.log(err)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '93614175-c763-4f00-9b25-297ce66135ab'
        todolistsAPI.updateTodolist(todoListId, 'yo yo pacan')
            .then(res => {
                return setState(res.data)
            }).catch((err) => {
            console.log(err)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>({name: 'Roma'})
    const todolistId = '5aab449d-04d6-45e0-9f6e-394ce39552d5'
    useEffect(() => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                return setState(res.data)
            }).catch((err) => {
            console.log(err)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>({name: 'Roma'})
    const todolistId = '5aab449d-04d6-45e0-9f6e-394ce39552d5'
    useEffect(() => {
        todolistsAPI.deleteTask(todolistId, '')
            .then(res => {
                return setState(res.data)
            }).catch((err) => {
            console.log(err)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    const [TodolistID, setTodolistID] = useState<string>('')
    const [taskTitle, setTitle] = useState<string>('')

    const AddTask = () => {
        todolistsAPI.addTask(TodolistID, taskTitle)
            .then(res => {
                return setState(res.data)
            }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <button onClick={AddTask}>Add task</button>
                <input type="text" placeholder='NewTitle' value={taskTitle} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
                <input type="text" placeholder='TodolistID' value={TodolistID} onChange={(e) => {
                    setTodolistID(e.currentTarget.value)
                }}/>
            </div>

        </div>
    )
}


export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [TodolistID, setTodolistID] = useState<string>('')
    const [taskTitle, setTitle] = useState<string>('')
    const [TaskId, setTaskId] = useState<string>('')

    const requestObj: UpdateTaskType = {
        title: taskTitle,
        description: '',
        completed: false,
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
    }

    const UpdateTaskBtnHandler = () => {
        todolistsAPI.updateTask(TodolistID, TaskId, requestObj)
            .then(res => {
                return setState(res.data)
            }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <button onClick={UpdateTaskBtnHandler}>Update Task</button>
                <input type="text" placeholder='NewTitle' value={taskTitle} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
                <input type="text" placeholder='TodolistID' value={TodolistID} onChange={(e) => {
                    setTodolistID(e.currentTarget.value)
                }}/>
                <input type="text" placeholder='TaskId' value={TaskId} onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
            </div>

        </div>
    )
}