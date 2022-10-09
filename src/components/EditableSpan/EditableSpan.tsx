import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanProps = {
    title: string
    onChange: (e: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanProps) => {
    console.log('Editable Span')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(' ')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ?
        <TextField variant={"filled"} onChange={onChangeTitleHandler} onBlur={activateViewMode} value={title}
                   autoFocus/> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
})