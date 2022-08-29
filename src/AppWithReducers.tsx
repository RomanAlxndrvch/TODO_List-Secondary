import React, {useReducer, useState} from 'react';
import './App.css';
import {List, TaskType} from "./List";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC, AddTodolistsActionType,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilteredValuesType = 'all' | 'completed' | 'active'


// States
function AppWithReducers() {

    const todoListId1 = v1()

    const todoListId2 = v1()

    // Lists (T0D0 Lists)
    let [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
            {id: todoListId1, title: 'What to learn?', filter: 'all'},
            {id: todoListId2, title: 'What to buy?', filter: 'all'}
        ]
    )

    let [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
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

    // Function for changing state
    function removeTask(id: string, todolistId: string) {
        dispatchTasksReducer(removeTaskAC(todolistId, id))
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasksReducer(addTaskAC(title, todolistId))
    }

    function changeTaskTitle(newValue: string, taskId: string, todoListId: string) {
        dispatchTasksReducer(changeTaskTitleAC(taskId, newValue, todoListId))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function changeFilter(value: FilteredValuesType, todoListId: string) {
        dispatchTodolistsReducer(changeTodolistFilterAC(value, todoListId))
    }

    function removeTodolist(todolistId: string) {
        dispatchTodolistsReducer(removeTodolistAC(todolistId))
        dispatchTasksReducer(removeTodolistAC(todolistId))
    }

    const changeTodoListTitle = (newTitle: string, id: string) => {
        dispatchTodolistsReducer(changeTodolistTitleAC(id, newTitle))
    }

    function addTodoList(title: string) {
        const newTodolistId = v1()
        dispatchTasksReducer(addTodolistAC(title, newTodolistId))
        dispatchTodolistsReducer(addTodolistAC(title, newTodolistId))
    }


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
                        return <Grid item key={el.id}>
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

export default AppWithReducers;
