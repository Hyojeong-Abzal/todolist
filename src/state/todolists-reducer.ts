import { AppRootStateType } from './store'
import { todolistsAPI } from './../api/todolists-api'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'
import { TodolistType } from '../api/todolists-api'

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolists

const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((tl) => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{ ...action.todo, filter: 'all' }, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find((tl) => tl.id === action.id)
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find((tl) => tl.id === action.id)
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter
      }
      return [...state]
    }
    case 'SET_TODOLIST': {
      return action.todos.map((td) => ({ ...td, filter: 'all' }))
    }
    default:
      return state
  }
}

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (todo: TodolistType) => {
  return { type: 'ADD-TODOLIST', todo } as const
}
export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}
export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}

export const setTodolists = (todos: TodolistType[]) => {
  return {
    type: SET_TODOLIST,
    todos,
  } as const
}

export type SetTodolists = ReturnType<typeof setTodolists>
const SET_TODOLIST = 'SET_TODOLIST'

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    todolistsAPI.getTodolists().then((res) => dispatch(setTodolists(res.data)))
  }
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item))
  })
}

export const deleteTodolistTC = (todolistId: string) => (
  dispatch: Dispatch
) => {
  todolistsAPI
    .deleteTodolist(todolistId)
    .then(() => dispatch(removeTodolistAC(todolistId)))
}


export const updateTodolistTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title).then( () => {
        dispatch(changeTodolistTitleAC(id, title))
    })
}