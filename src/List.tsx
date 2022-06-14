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
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: string
}

export function List(props: PropsType) {

    const [input, setInput] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskButtonHandler = () => {
        if (input.trim() !== '') {
            props.addTask(input.trim())
            setInput('')
        }
        else {
            setError('Title is required!')
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
        setError(null)
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
                        className={'error'}
                        value={input}
                        onChange={onChangeInputHandler}
                        onKeyDown={onKeyDownButtonHandler}/>

                    <button onClick={addTaskButtonHandler}>+</button>
                    {error && <div className={'error-message'}>Field is required!</div>}
                </div>
                <ul>
                    {
                        props.tasks.map((task) => {
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeStatus(task.id, e.currentTarget.checked)
                                }
                                const onRemoveHandler = () => {
                                    props.removeTasks(task.id)
                                }
                                return (
                                    <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                                        <input type="checkbox"
                                               onChange={onChangeHandler}
                                               checked={task.isDone}
                                        /> <span>{task.title}</span>
                                        <button onClick={onRemoveHandler}>x</button>
                                    </li>)
                            }
                        )
                    }
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllBtnHandler}>All
                    </button>

                    <button
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveBtnHandler}>Active
                    </button>

                    <button
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedBtnHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )

}

