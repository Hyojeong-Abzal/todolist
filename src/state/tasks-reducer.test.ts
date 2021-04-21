import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTextAC,
  RemoveTaskAC,
  tasksReducers,
} from './tasks-reducer'
import { v1 } from 'uuid'
import { TasksStateType } from '../App'

let startState: TasksStateType
let todolistId1 = v1()
let todolistId2 = v1()
let taskId1 = v1()
let taskId2 = v1()

let taskId3 = v1()
let taskId4 = v1()

let newText = 'New Task'
let newValue = false

beforeEach(() => {
  startState = {
    [todolistId1]: [
      { id: taskId1, text: 'HTML and CSS', isDone: true },
      { id: taskId2, text: 'JS', isDone: true },
    ],
    [todolistId2]: [
      { id: taskId3, text: 'Milk', isDone: true },
      { id: taskId4, text: 'React book', isDone: true },
    ],
  }
})
/////////////

test('correct task should be added', () => {
  const endState: TasksStateType = tasksReducers(
    startState,
    AddTaskAC(newText, todolistId1)
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][2].text).toBe(newText)
})

///////////////

test('correct task should be deleted', () => {
  const endState: TasksStateType = tasksReducers(
    startState,
    RemoveTaskAC(taskId3, todolistId2)
  )

  expect(endState[todolistId2].length).toBe(1)
  expect(endState[todolistId2][0].id).toBe(taskId4)
})

////////////////

test('correct task should change its text', () => {
  const endState: TasksStateType = tasksReducers(
    startState,
    ChangeTaskTextAC(taskId2, newText, todolistId1)
  )

  expect(endState[todolistId1][1].text).toBe(newText)
  expect(endState[todolistId1][0].text).toBe('HTML and CSS')
})

//////////////////

test('correct task should change its status', () => {
  const endState: TasksStateType = tasksReducers(
    startState,
    ChangeTaskStatusAC(taskId4, newValue, todolistId2)
  )

  expect(endState[todolistId2][1].isDone).toBe(newValue)
  expect(endState[todolistId2][0].isDone).toBe(true)
})
