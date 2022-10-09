import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)

    }
    const onKeyDownButtonHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            addTaskButtonHandler()
        }
    }
    const addTaskButtonHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        }
        else {
            setError('Title is required!')

        }
    }

    return <div>
        {/*        <input
            className={error ? 'error' : ''}
            value={title}
            onChange={onChangeInputHandler}
            onKeyDown={onKeyDownButtonHandler}/>*/}

        <TextField
            label="Type Value"
            variant="outlined"
            error={!!error}
            className={error ? 'error' : ''}
            value={title}
            onChange={onChangeInputHandler}
            onKeyDown={onKeyDownButtonHandler}
            helperText={error}/>

        <IconButton onClick={addTaskButtonHandler} color={"primary"}>
            <ControlPoint fontSize={"large"}/>
        </IconButton>
    </div>
})