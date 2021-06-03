import { AppRootStateType } from './store'
import { todolistsAPI } from './../api/todolists-api'
import { TasksStateType } from '../App'
import { v1 } from 'uuid'
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolists,
} from './todolists-reducer'
import { TaskPriorities, TaskStatuses, TaskType } from '../api/todolists-api'
import { Dispatch } from 'redux'

export type SetTasksActionType = ReturnType<typeof setTasks>

export const SET_TASKS = 'SET_TASKS'

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  todolistId: string
  taskId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK'
  task: TaskType
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  todolistId: string
  taskId: string
  status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  todolistId: string
  taskId: string
  title: string
}

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolists
  | SetTasksActionType

const initialState: TasksStateType = {
  /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/
}

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = { ...state }
      const tasks = stateCopy[action.todolistId]
      const newTasks = tasks.filter((t) => t.id !== action.taskId)
      stateCopy[action.todolistId] = newTasks
      return stateCopy
    }
    case 'ADD-TASK': {
      const stateCopy = { ...state }
      const tasks = stateCopy[action.task.todoListId]
      stateCopy[action.task.todoListId] = [action.task, ...tasks]
      return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId]
      let newTasksArray = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, status: action.status } : t
      )

      state[action.todolistId] = newTasksArray
      return { ...state }
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId]
      // найдём нужную таску:
      let newTasksArray = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      )

      state[action.todolistId] = newTasksArray
      return { ...state }
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todo.id]: [],
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = { ...state }
      delete copyState[action.id]
      return copyState
    }
    case 'SET_TODOLIST': {
      const copyState = { ...state }
      action.todos.forEach((tl) => {
        copyState[tl.id] = []
      })
      return copyState
    }
    case 'SET_TASKS': {
      const copyState = { ...state }
      copyState[action.todolistId] = action.tasks
      return copyState
    }
    default:
      return state
  }
}

export const removeTaskAC = (
  todolistId: string,
  taskId: string
): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todolistId, taskId }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return { type: 'ADD-TASK', task }
}
export const changeTaskStatusAC = (
  taskId: string,
  status: TaskStatuses,
  todolistId: string
): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', status, todolistId, taskId }
}
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId }
}

export const setTasks = (tasks: Array<TaskType>, todolistId: string) => {
  return {
    type: SET_TASKS,
    tasks,
    todolistId,
  } as const
}

export const fetchTasks = (todolistId: string) => (dispactch: Dispatch) => {
  todolistsAPI.getTasks(todolistId).then((res) => {
    dispactch(setTasks(res.data.items, todolistId))
  })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (
  dispactch: Dispatch
) => {
  todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
    dispactch(removeTaskAC(todolistId, taskId))
  })
}

export const addTaskTC = (todolistId: string, title: string) => (
  dispatch: Dispatch
) => {
  todolistsAPI.createTask(todolistId, title).then((res) => {
    dispatch(addTaskAC(res.data.data.item))
  })
}

export const updateTaskStatusTC = (
  todolistId: string,
  taskId: string,
  status: TaskStatuses
) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const allTasks = getState().tasks
  const currentTask = allTasks[todolistId]
  const task = currentTask.find((t) => t.id === taskId)
  if (task) {
    todolistsAPI
      .updateTask(todolistId, taskId, {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: status,
      })
      .then(() => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId))
      })
  }
}

export const updateTaskTitleTC = (
  todolistId: string,
  taskId: string,
  title: string
) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allTasks = getState().tasks
    const currentTask = allTasks[todolistId]
    const task = currentTask.find((t) => t.id === taskId)
  if (task) {
    todolistsAPI
      .updateTask(todolistId, taskId, {
        title: title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
      })
      .then(() => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
      })
  }
}
