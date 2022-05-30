import React from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks:(e:number) => void
}

export function List(props: PropsType) {
    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {
                        props.tasks.map((e, index) => {
                                return <li key={e.id}>
                                    <input type="checkbox" checked={e.isDone}/> <span>{e.title}</span>
                                    <button onClick={() =>props.removeTasks(e.id) }>x
                                    </button>
                                </li>
                            }
                        )
                    }
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )

}

