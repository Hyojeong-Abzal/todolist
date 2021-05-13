import { v1 } from 'uuid'
import { FilterTypeValue, todolistTypeArr } from '../AppWithRedux'

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  todolistID: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  id: string
}

type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  todolistID: string
  title: string
}

type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  newFilterValue: FilterTypeValue
  todolistID: string
}

const initialState: Array<todolistTypeArr> = []

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export const todolistsReducer = (
  todolists = initialState,
  action: ActionsType
): Array<todolistTypeArr> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todolists.filter((tl) => tl.id != action.todolistID)

    case 'ADD-TODOLIST':
      const newTodolist: todolistTypeArr = {
        id: action.id,
        title: action.title,
        filter: 'All',
      }
      return [...todolists, newTodolist]

    case 'CHANGE-TODOLIST-TITLE':
      return todolists.map((tl) =>
        tl.id === action.todolistID ? { ...tl, title: action.title } : tl
      )
    case 'CHANGE-TODOLIST-FILTER':
      return todolists.map((tl) =>
        tl.id === action.todolistID
          ? { ...tl, filter: action.newFilterValue }
          : tl
      )
    default:
      return todolists
  }
}

// action creators
export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return {
    type: 'REMOVE-TODOLIST',
    todolistID: id,
  }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: 'ADD-TODOLIST',
    title: title,
    id: v1(),
  }
}

export const changeTodolistTitleAC = (
  todolistID: string,
  title: string
): ChangeTodolistTitleActionType => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistID,
    title,
  }
}

export const changeTodolistFilterAC = (
  id: string,
  newValue: FilterTypeValue
): ChangeTodolistFilterActionType => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistID: id,
    newFilterValue: newValue,
  }
}
