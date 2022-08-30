import React from 'react';
import './App.css';
import {List, TaskType} from "./List";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,

} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilteredValuesType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string
    title: string
    filter: FilteredValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {

    // States
    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)

    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    // Function for changing state
    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(todolistId, id))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeTaskTitle(newValue: string, taskId: string, todoListId: string) {
        dispatch(changeTaskTitleAC(taskId, newValue, todoListId))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function changeFilter(value: FilteredValuesType, todoListId: string) {
        dispatch(changeTodolistFilterAC(value, todoListId))
    }

    function removeTodolist(todolistId: string) {
        dispatch(removeTodolistAC(todolistId))
    }

    const changeTodoListTitle = (newTitle: string, id: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }

    function addTodoList(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)
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
                        let tasksForTodoList = tasks[el.id]
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
