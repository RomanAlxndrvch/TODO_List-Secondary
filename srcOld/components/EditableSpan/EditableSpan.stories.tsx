import {action} from "@storybook/addon-actions";
import React from "react";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
}

const changedCallBack = action('Value Changed')

export const EditableSpankBaseExample = () => {
    return <div>
        <EditableSpan title={'Start Value'} onChange={changedCallBack}/>
    </div>
}