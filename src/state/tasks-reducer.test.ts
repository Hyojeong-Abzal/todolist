import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTextAC,
  removeTaskAC,
  tasksReducer as tasksReducer,
} from './tasks-reducer'
import { v1 } from 'uuid'
import { TasksStateType } from '../App'
import { addTodolistAC } from './todolists-reducers'

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
  const endState: TasksStateType = tasksReducer(
    startState,
    addTaskAC(newText, todolistId1)
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][2].text).toBe(newText)
})

///////////////

test('correct task should be deleted', () => {
  const endState: TasksStateType = tasksReducer(
    startState,
    removeTaskAC(taskId3, todolistId2)
  )

  expect(endState[todolistId2].length).toBe(1)
  expect(endState[todolistId2][0].id).toBe(taskId4)
})

////////////////

test('correct task should change its text', () => {
  const endState: TasksStateType = tasksReducer(
    startState,
    changeTaskTextAC(taskId2, newText, todolistId1)
  )

  expect(endState[todolistId1][1].text).toBe(newText)
  expect(endState[todolistId1][0].text).toBe('HTML and CSS')
})

//////////////////

test('correct task should change its status', () => {
  const endState: TasksStateType = tasksReducer(
    startState,
    changeTaskStatusAC(taskId4, newValue, todolistId2)
  )

  expect(endState[todolistId2][1].isDone).toBe(newValue)
  expect(endState[todolistId2][0].isDone).toBe(true)
})
// 5 test

test('new array should be added when new todolist is added', () => {
  const endState = tasksReducer(startState, addTodolistAC('new todolist'))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != todolistId1 && k != todolistId2)
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey].length).toBe(0)
})
