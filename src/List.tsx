import React, {ChangeEvent} from "react";
import {FilteredValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Delete} from "@mui/icons-material";


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
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilteredValuesType
    removeTodolist: (e: string) => void
    changeTodoListTitle: (newTitle: string, id: string) => void
    changeTaskTitle: (newValue: string, taskId: string, todoListId: string) => void
}

export function List(props: PropsType) {
    const onAllBtnHandler = () => props.changeFilter('all', props.id)
    const onActiveBtnHandler = () => props.changeFilter('active', props.id)
    const onCompletedBtnHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div className="App">
            <div>
                <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                    <IconButton onClick={removeTodolist}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <div>
                    {
                        props.tasks.map((task) => {
                                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                                }
                                const onChangeTitleHandler = (newValue: string) => {
                                    props.changeTaskTitle(newValue, task.id, props.id)
                                }
                                const onRemoveHandler = () => {
                                    props.removeTasks(task.id, props.id)
                                }
                                return (
                                    <div className={task.isDone ? 'is-done' : ''} key={task.id}>
                                        <Checkbox
                                            onChange={onChangeStatusHandler}
                                            checked={task.isDone}
                                        /> <EditableSpan title={task.title}
                                                         onChange={onChangeTitleHandler}/>
                                        <IconButton
                                            onClick={onRemoveHandler}> <DeleteIcon/></IconButton>
                                    </div>)
                            }
                        )
                    }
                </div>
                <div>
                    <Button variant={props.filter === 'all' ? 'contained' : "text"}
                            onClick={onAllBtnHandler}>All
                    </Button>

                    <Button variant={props.filter === 'active' ? 'contained' : "text"}
                            color={"primary"}
                            onClick={onActiveBtnHandler}>Active
                    </Button>

                    <Button variant={props.filter === 'completed' ? 'contained' : "text"}
                            color={"secondary"}
                            onClick={onCompletedBtnHandler}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}

