import React, {useCallback} from "react";
import {FilteredValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";


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
    changeTaskTitle: (newValue: string, taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeFilter: (e: FilteredValuesType, todoListId: string) => void
    addTask: (task: string, todolistId: string) => void
    filter: FilteredValuesType
    removeTodolist: (e: string) => void
    changeTodoListTitle: (newTitle: string, id: string) => void
}

export const List = React.memo((props: PropsType) => {
    const onAllBtnHandler = useCallback(() => props.changeFilter('all', props.id), [props.id, props.changeFilter])

    const onActiveBtnHandler = useCallback(() => props.changeFilter('active', props.id), [props.id, props.changeFilter])

    const onCompletedBtnHandler = useCallback(() => props.changeFilter('completed', props.id), [props.id, props.changeFilter])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }, [props.changeTodoListTitle, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.id, props.addTask])

    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter((e) => !e.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter((e) => e.isDone)
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
                        tasksForTodoList.map((task) => {
                                return <Task
                                    key={task.id}
                                    removeTasks={props.removeTasks}
                                    changeTaskTitle={props.changeTaskTitle}
                                    changeTaskStatus={props.changeTaskStatus}
                                    todolistId={props.id}
                                    task={task}/>
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
})

