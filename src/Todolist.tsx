import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {filterTypeValue} from "./App";


export type tasksType = {
    id: string
    text: string
    isDone: boolean
}

type todolistType = {
    changeTaskStatus: (taskID: string, isDoneValue: boolean, todolistId: string) => void
    title: string
    tasks: Array<tasksType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: filterTypeValue, todolistId: string) => void
    addTask: (text: string, todolistId: string) => void
    id: string
    filter: filterTypeValue
    removeTodolist: (id: string) => void
}


export const Todolist: React.FC<todolistType> = (props) => {
    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }
    const task = props.tasks.map(t => {
        const onRemoveHadler = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input
                type="checkbox"
                checked={t.isDone}
                onChange={changeStatus}/>
            <span>{t.text}</span>
            <button onClick={onRemoveHadler}>x</button>
        </li>
    });

    const [newTaskText, setNewTaskText] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskText(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            addTask();
        }
    }
    const addTask = () => {
        const trimmedText = newTaskText.trim();
        if (trimmedText) {
            props.addTask(trimmedText, props.id);
        } else {
            setError("Title is required!")
        }
        setNewTaskText("");
    }

    const onAllClickHandler = () => props.changeFilter("All", props.id)
    const onActiveClickHandler = () => props.changeFilter("Active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("Completed", props.id)

    const AllButtonClass = props.filter === "All" ? "active-filter" : " ";
    const ActiveButtonClass = props.filter === "Active" ? "active-filter" : " ";
    const CompletedButtonClass = props.filter === "Completed" ? "active-filter" : " ";
    const errorMessage = error ? <div className={"error-message"}>{error}</div> : null;


    return (
        <div className={"todoListWrapper"}>
            <h3>{props.title}</h3>

            <div>
                <input value={newTaskText}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error-Input" : ""}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>

            <ul>
                {task}
            </ul>


            <div>
                <button className={AllButtonClass} onClick={onAllClickHandler}>All</button>
                <button className={ActiveButtonClass} onClick={onActiveClickHandler}>Active</button>
                <button className={CompletedButtonClass} onClick={onCompletedClickHandler}>Completed</button>
                <button onClick={removeTodoList}>x</button>
            </div>
        </div>)
}
