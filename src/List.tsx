import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilteredValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (e: string, todolistId: string) => void
    changeFilter: (e: FilteredValuesType, todoListId: string) => void
    addTask: (task: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilteredValuesType
    removeTodolist: (e: string) => void
}

export function List(props: PropsType) {

    const [input, setInput] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskButtonHandler = () => {
        if (input.trim() !== '') {
            props.addTask(input.trim(), props.id)
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
    const onAllBtnHandler = () => props.changeFilter('all', props.id)
    const onActiveBtnHandler = () => props.changeFilter('active', props.id)
    const onCompletedBtnHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }


    return (
        <div className="App">
            <div>
                <h3>{props.title}
                    <button onClick={removeTodolist}>X</button>
                </h3>
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
                                    props.changeStatus(task.id, e.currentTarget.checked, props.id)
                                }
                                const onRemoveHandler = () => {
                                    props.removeTasks(task.id, props.id)
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

