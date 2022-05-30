import React from 'react';
import './App.css';
import {List, TaskType} from "./List";

function App() {


    let tasks1: Array<TaskType> = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ]

    let tasks2: Array<TaskType> = [
        {id: 1, title: 'Terminator', isDone: true},
        {id: 2, title: 'XXX', isDone: false},
    ]


    return (
        <div>
            <List title={'What to learn?'} tasks={tasks1}/>
            <List title={'Movies'} tasks={tasks2}/>
        </div>

    );
}

export default App;
