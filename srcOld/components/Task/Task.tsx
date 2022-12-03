import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../../List";

type TaskPropsType = {
    removeTasks: (e: string, todolistId: string) => void
    changeTaskTitle: (newValue: string, taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    todolistId: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }, [props.changeTaskStatus, props.task.id, props.todolistId])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(newValue, props.task.id, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

    const onRemoveHandler = useCallback(() => {
        props.removeTasks(props.task.id, props.todolistId)
    }, [props.removeTasks, props.task.id, props.todolistId])
    return (
        <div className={props.task.isDone ? 'is-done' : ''} key={props.task.id}>
            <Checkbox
                onChange={onChangeStatusHandler}
                checked={props.task.isDone}
            /> <EditableSpan title={props.task.title}
                             onChange={onChangeTitleHandler}/>
            <IconButton
                onClick={onRemoveHandler}> <DeleteIcon/></IconButton>
        </div>)
})