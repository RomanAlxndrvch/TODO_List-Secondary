import React, {useState} from 'react';
import './App.css';
import {List, TaskType} from "./List";

export type FilteredValuesType = 'all' | 'completed' | 'active'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    let [filtered, setFilter] = useState<FilteredValuesType>('active')

    function removeTask(id: number) {
        let resultTasks = tasks.filter((value) => value.id !== id)
        console.log(resultTasks)
        setTasks(resultTasks)
    }

    function changeFilter(value: FilteredValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks
    if (filtered === 'active') {
        tasksForTodoList = tasks.filter((e) => e.isDone === false)
    }
    if (filtered === 'completed') {
        tasksForTodoList = tasks.filter((e) => e.isDone === true)
    }


    return (
        <div>
            <List title={'What to learn?'} tasks={tasksForTodoList} removeTasks={removeTask}
                  changeFilter={changeFilter}/>
        </div>

    );
}

export default App;
