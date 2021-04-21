import React, { useState } from 'react'
import { v1 } from 'uuid'
import { TasksStateType } from '../App'

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

type tasksActionType =
  | addTaskActionType
  | removeTaskActionType
  | changeTaskTextActionType
  | changeTaskStatusActionType

export const tasksReducers = (
  tasks: TasksStateType,
  action: tasksActionType
): TasksStateType => {
  switch (action.type) {
    case 'ADD-TASK':
      let newTask = { id: v1(), text: action.text, isDone: false }
      let todolistTasks1 = tasks[action.todolistId]
      tasks[action.todolistId] = [...todolistTasks1, newTask]
      return { ...tasks }
    case 'REMOVE-TASK':
      let todolistTasks2 = tasks[action.todolistId]
      tasks[action.todolistId] = todolistTasks2.filter((t) => t.id != action.id)
      return { ...tasks }
    case 'CHANGE-TASK-TEXT':
      let todolistTasks3 = tasks[action.todolistId]
      tasks[action.todolistId] = todolistTasks3.map((task) =>
        task.id === action.taskID ? { ...task, text: action.text } : task
      )
      return { ...tasks }
    case 'CHANGE-TASK-STATUS':
      let todolistTasks4 = tasks[action.todolistId]
      tasks[action.todolistId] = todolistTasks4.map((task) =>
        task.id === action.taskID
          ? { ...task, isDone: action.isDoneValue }
          : task
      )
      return { ...tasks }
    default:
      return tasks
  }
}

// action creators

export const AddTaskAC = (
  text: string,
  todolistId: string
): addTaskActionType => {
  return {
    type: 'ADD-TASK',
    text,
    todolistId,
  }
}

export const RemoveTaskAC = (
  id: string,
  todolistId: string
): removeTaskActionType => {
  return {
    type: 'REMOVE-TASK',
    id,
    todolistId,
  }
}

export const ChangeTaskTextAC = (
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

export const ChangeTaskStatusAC = (
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
