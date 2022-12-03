import React, {useState} from 'react';
import './App.css';
import {List, TaskType} from "./List";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilteredValuesType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string
    title: string
    filter: FilteredValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
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
            setTodolists([...todolists])
        }
    }

    function changeTaskTitle(newValue: string, taskId: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(task => task.id === taskId)
        if (task) {
            task.title = newValue
        }
        setTasksObj({...tasksObj})
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
        setTodolists(filteredTodolists)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    const changeTodoListTitle = (newTitle: string, id: string) => {
        const todoList = todolists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodolists([...todolists])
        }
    }

    function addTodoList(title: string) {
        let todoList: TodoListType = {id: v1(), title: title, filter: 'all'}
        setTodolists([todoList, ...todolists])
        setTasksObj({
                ...tasksObj,
                [todoList.id]: []
            }
        )
    }


    const todoListId1 = v1()

    const todoListId2 = v1()

    // Lists (T0D0 Lists)
    let [todolists, setTodolists] = useState<Array<TodoListType>>(
        [
            {id: todoListId1, title: 'What to learn?', filter: 'all'},
            {id: todoListId2, title: 'What to buy?', filter: 'all'}
        ]
    )

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
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

            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed style={{marginTop: '20px'}}>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={10}>
                    {todolists.map((el) => {
                        let tasksForTodoList = tasksObj[el.id]
                        if (el.filter === 'active') {
                            tasksForTodoList = tasksForTodoList.filter((e) => !e.isDone)
                        }
                        if (el.filter === 'completed') {
                            tasksForTodoList = tasksForTodoList.filter((e) => e.isDone)
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <List
                                    key={el.id}
                                    id={el.id}
                                    title={el.title}
                                    tasks={tasksForTodoList}
                                    removeTasks={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={el.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodoListTitle={changeTodoListTitle}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
