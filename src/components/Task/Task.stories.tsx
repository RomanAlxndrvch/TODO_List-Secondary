import {action} from "@storybook/addon-actions";
import React from "react";
import {Task} from "./Task";


export default {
    title: 'Task Component',
    component: Task,

}

const removeTasks = action('Task been removed')
const changeTaskTitle = action('Title been changed')
const changeTaskStatus = action('Task Status been changed')

export const TaskBaseExample = () => {
    return <div>
        <Task
            removeTasks={removeTasks}
            changeTaskTitle={changeTaskTitle}
            changeTaskStatus={changeTaskStatus}
            todolistId={'todolistId1'}
            task={{id: '1', isDone: true, title: 'css'}}/>

        <Task
            removeTasks={removeTasks}
            changeTaskTitle={changeTaskTitle}
            changeTaskStatus={changeTaskStatus}
            todolistId={'todolistId2'}
            task={{id: '2', isDone: false, title: 'JS'}}/>
    </div>
}