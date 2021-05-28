import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TasksAPI, todolistAPI } from '../api/todolist-api';

export default {
    title: 'API'
}






export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("new Title")
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId1 = "d8f02cdf-85a1-433b-9118-cda5ff332994";
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId1)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId1 = "684081db-5013-41cc-b99e-ddf705753168"
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId1, "new Title 22")
            .then((res) => {
                setState(res.data.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}



export const GetTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "dba33205-385d-45cd-9489-4bee03ebb54f"
        TasksAPI.getTodolistTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTaskInTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "2cdce626-a10c-49fb-9156-754e58039d83"
        TasksAPI.createTaskInTodolist(todolistId, "new Task")
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
// https://social-network.samuraijs.com/api/1.1/todo-lists/dba33205-385d-45cd-9489-4bee03ebb54f/tasks

export const DeleteTaskInTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId1 = "dba33205-385d-45cd-9489-4bee03ebb54f";
    const taskId = "b8f81506-5d5b-417f-b799-eae5e6bd5c14"
    useEffect(() => {
        TasksAPI.deleteTaskInTodolist(todolistId1, taskId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTasksTitleInTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId1 = "dba33205-385d-45cd-9489-4bee03ebb54f";
    const taskId = "f90eb336-aaa6-4bb5-8d0d-ff2ff0c1faaf";

    const newTitle = {
        title: "SUANnnnnnNNNNN",
        description: "",
        status: 1,
        priority: 1,
        startDate: "",
        deadline: "",
    }
    useEffect(() => {
        TasksAPI.updateTasksTitleInTodolist(todolistId1, taskId, newTitle)
            .then((res) => {
                setState(res.data.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
