import { v1 } from 'uuid'
import { TasksStateType, todolistTypeArr } from '../App'
import { tasksReducer } from './tasks-reducer'
import {
  addTodolistAC,
  removeTodolistAC,
  todolistsReducer,
} from './todolists-reducers'

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<todolistTypeArr> = []

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.id)
  expect(idFromTodolists).toBe(action.id)
})

test('property with todolistId should be deleted', () => {
  let todolistId1 = v1()
  let todolistId2 = v1()
  const startState: TasksStateType = {
    [todolistId1]: [
      { id: '1', text: 'CSS', isDone: false },
      { id: '2', text: 'JS', isDone: true },
      { id: '3', text: 'React', isDone: false },
    ],
    [todolistId2]: [
      { id: '1', text: 'bread', isDone: false },
      { id: '2', text: 'milk', isDone: true },
      { id: '3', text: 'tea', isDone: false },
    ],
  }

  const action = removeTodolistAC(todolistId2)

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todolistId2]).not.toBeDefined()
})
