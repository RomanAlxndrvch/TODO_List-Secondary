import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../api/todolists-api";

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
