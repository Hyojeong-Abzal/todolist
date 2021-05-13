import React, { useState } from 'react'
import { v1 } from 'uuid'
import { TasksStateType } from '../AppWithRedux'
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from './todolists-reducers'

type addTaskActionType = {
  type: 'ADD-TASK'
  text: string
  todolistId: string
}

type removeTaskActionType = {
  type: 'REMOVE-TASK'
  id: string
  todolistId: string
}

type changeTaskTextActionType = {
  type: 'CHANGE-TASK-TEXT'
  taskID: string
  text: string
  todolistId: string
}

type changeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskID: string
  isDoneValue: boolean
  todolistId: string
}

const initialState: TasksStateType = {}

type tasksActionType =
  | addTaskActionType
  | removeTaskActionType
  | changeTaskTextActionType
  | changeTaskStatusActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export const tasksReducer = (
  tasks = initialState,
  action: tasksActionType
): TasksStateType => {
  let stateCopy = { ...tasks }

  switch (action.type) {
    case 'ADD-TASK':
      let newTask = { id: v1(), text: action.text, isDone: false }
      stateCopy[action.todolistId] = [...stateCopy[action.todolistId], newTask]
      return stateCopy
    case 'REMOVE-TASK':
      stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(
        (t) => t.id != action.id
      )
      return stateCopy
    case 'CHANGE-TASK-TEXT':
      tasks[action.todolistId] = tasks[action.todolistId].map((task) =>
        task.id === action.taskID ? { ...task, text: action.text } : task
      )
      return { ...tasks }
    case 'CHANGE-TASK-STATUS':
      tasks[action.todolistId] = tasks[action.todolistId].map((task) =>
        task.id === action.taskID
          ? { ...task, isDone: action.isDoneValue }
          : task
      )
      return { ...tasks }
    case 'ADD-TODOLIST':
      stateCopy = { ...stateCopy, [action.id]: [] }
      return stateCopy
    case 'REMOVE-TODOLIST':
      delete stateCopy[action.todolistID]
      return stateCopy
    default:
      return tasks
  }
}

// action creators

export const addTaskAC = (
  text: string,
  todolistId: string
): addTaskActionType => {
  return {
    type: 'ADD-TASK',
    text,
    todolistId,
  }
}

export const removeTaskAC = (
  id: string,
  todolistId: string
): removeTaskActionType => {
  return {
    type: 'REMOVE-TASK',
    id,
    todolistId,
  }
}

export const changeTaskTextAC = (
  taskID: string,
  text: string,
  todolistId: string
): changeTaskTextActionType => {
  return {
    type: 'CHANGE-TASK-TEXT',
    taskID,
    text,
    todolistId,
  }
}

export const changeTaskStatusAC = (
  taskID: string,
  isDoneValue: boolean,
  todolistId: string
): changeTaskStatusActionType => {
  return {
    type: 'CHANGE-TASK-STATUS',
    taskID,
    isDoneValue,
    todolistId,
  }
}
