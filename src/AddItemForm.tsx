import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

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
        <input
            className={error ? 'error' : ''}
            value={title}
            onChange={onChangeInputHandler}
            onKeyDown={onKeyDownButtonHandler}/>

        <button onClick={addTaskButtonHandler}>+</button>
        {error && <div className={'error-message'}>Field is required!</div>}
    </div>
}