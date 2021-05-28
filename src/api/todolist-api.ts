import { CreateTodolist } from './../stories/todolists-api.stories'
import axios from 'axios'

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}
type ItemType = {
  addedDate: string
  deadline: null
  description: null
  id: string
  order: number
  priority: number
  startDate: null
  status: number
  title: string
  todoListId: string
}
type TaskType = {
  items: ItemType[]
  totalCount: number
  error: null
}

type TaskResponseType = {
  data: ItemType
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}
type updateTaskType = {
  title: string
  description: string | null
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
  },
})

export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {
      title,
    })
  },
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists')
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
}

export const TasksAPI = {
  getTodolistTasks(todolistId: string) {
    return instance.get<TaskType>(`todo-lists/${todolistId}/tasks`)
  },
  createTaskInTodolist(todolistId: string, title: string) {
    return instance.post<TaskResponseType>(`todo-lists/${todolistId}/tasks`, {
      title,
    })
  },
  deleteTaskInTodolist(todolistId: string, taskId: string) {
    return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTasksTitleInTodolist(
    todolistId: string,
    taskId: string,
    title: updateTaskType
  ) {
    return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, title)
  },
}
