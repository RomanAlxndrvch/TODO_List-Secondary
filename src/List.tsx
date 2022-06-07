import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilteredValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (e: string) => void
    changeFilter: (e: FilteredValuesType) => void
    addTask: (task: string) => void
}

export function List(props: PropsType) {

    const [input, setInput] = useState('')
    const addTaskButtonHandler = () => {
        props.addTask(input)
        setInput('')
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }
    const onKeyDownButtonHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            addTaskButtonHandler()
        }
    }
    const onAllBtnHandler = () => props.changeFilter('all')
    const onActiveBtnHandler = () => props.changeFilter('active')
    const onCompletedBtnHandler = () => props.changeFilter('completed')


    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={input}
                        onChange={onChangeInputHandler}
                        onKeyDown={onKeyDownButtonHandler}/>

                    <button onClick={addTaskButtonHandler}>+</button>
                </div>
                <ul>
                    {
                        props.tasks.map((e) => {
                                const onRemoveHandler = () => {
                                    props.removeTasks(e.id)
                                }
                                return (
                                    <li key={e.id}>
                                        <input type="checkbox" checked={e.isDone}/> <span>{e.title}</span>
                                        <button onClick={onRemoveHandler}>x</button>
                                    </li>)
                            }
                        )
                    }
                </ul>
                <div>
                    <button onClick={onAllBtnHandler}>All</button>
                    <button onClick={onActiveBtnHandler}>Active</button>
                    <button onClick={onCompletedBtnHandler}>Completed</button>
                </div>
            </div>
        </div>
    )

}

