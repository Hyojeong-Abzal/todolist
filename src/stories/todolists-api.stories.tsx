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
    const todolistId1 = "c54eb124-4f83-4516-a360-6ab7ec0dccd1";
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
        const todolistId = "dba33205-385d-45cd-9489-4bee03ebb54f"
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
    const taskId = "84a6331c-eca1-426d-be3e-44cd5b145a78"
    useEffect(() => {
        TasksAPI.deleteTaskInTodolist(todolistId1, taskId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTasksTitleInTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId1 = "dba33205-385d-45cd-9489-4bee03ebb54f";
    const taskId = "84a6331c-eca1-426d-be3e-44cd5b145a78";

    const newTitle = {
        title: "SUANnnnnnNNNNN",
        description: null,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
    }
    useEffect(() => {
        TasksAPI.updateTasksTitleInTodolist(todolistId1, taskId, newTitle)
            .then((res) => {
                setState(res.data.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
