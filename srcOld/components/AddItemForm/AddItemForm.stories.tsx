import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import React from "react";


export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
}

const callback = action('Button add has been pressed')

export const AddItemBaseExample = (props: any) => {
    return <AddItemForm addItem={callback}/>
}