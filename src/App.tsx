import React from 'react';
import './App.css';
import {List, TaskType} from "./List";

function App() {


    let tasks: Array<TaskType> = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ]


    function removeTask(id: number) {
        let resultTasks = tasks.filter((value) => value.id !== id)
        console.log(resultTasks)
    }


    return (
        <div>
            <List title={'What to learn?'} tasks={tasks} removeTasks={removeTask}/>
        </div>

    );
}

export default App;
