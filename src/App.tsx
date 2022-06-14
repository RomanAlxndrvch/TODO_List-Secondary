import React, {useState} from 'react';
import './App.css';
import {List, TaskType} from "./List";
import {v1} from "uuid";

export type FilteredValuesType = 'all' | 'completed' | 'active'

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])
    let [filtered, setFilter] = useState<FilteredValuesType>('all')

    function removeTask(id: string) {
        let resultTasks = tasks.filter((value) => value.id !== id)
        setTasks(resultTasks)
    }

    function addTask(task: string) {
        let newTask: TaskType = {id: v1(), title: `${task}`, isDone: false}
        setTasks([newTask, ...tasks])
    }

    function changeFilter(value: FilteredValuesType) {
        setFilter(value)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(task => task.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let tasksForTodoList = tasks
    if (filtered === 'active') {
        tasksForTodoList = tasks.filter((e) => !e.isDone)
    }
    if (filtered === 'completed') {
        tasksForTodoList = tasks.filter((e) => e.isDone)
    }

    return (
        <div>
            <List title={'What to learn?'} tasks={tasksForTodoList} removeTasks={removeTask}
                  changeFilter={changeFilter} addTask={addTask} changeStatus={changeStatus} filter={filtered}/>
        </div>

    );
}

export default App;
