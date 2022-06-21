import React, {useState} from 'react';
import './App.css';
import {List, TaskType} from "./List";
import {v1} from "uuid";

export type FilteredValuesType = 'all' | 'completed' | 'active'
type TodoListType = {
    id: string
    title: string
    filter: FilteredValuesType
}

// States
function App() {

    // Function for changing state
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter((value) => value.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(title: string, todolistId: string) {
        let task: TaskType = {id: v1(), title: `${title}`, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilteredValuesType, todoListId: string) {
        let todolist = todolists.find(el => el.id === todoListId);
        if (todolist) {
            todolist.filter = value
            setTodolist([...todolists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(task => task.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasksObj({...tasksObj})
    }

    function removeTodolist(todolistId: string) {
        let filteredTodolists = todolists.filter((el) =>
            el.id !== todolistId
        )
        setTodolist(filteredTodolists)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }


    const todoListId1 = v1()

    const todoListId2 = v1()

    // Lists (T0D0 Lists)
    let [todolists, setTodolist] = useState<Array<TodoListType>>(
        [
            {id: todoListId1, title: 'What to learn?', filter: 'active'},
            {id: todoListId2, title: 'What to buy?', filter: 'completed'}
        ]
    )

    let [tasksObj, setTasksObj] = useState({
        [todoListId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Books', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    })

    return (
        <div className={'App'}>
            {todolists.map((el) => {

                let tasksForTodoList = tasksObj[el.id]
                if (el.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter((e) => !e.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter((e) => e.isDone)
                }
                return <List
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    tasks={tasksForTodoList}
                    removeTasks={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={el.filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;
