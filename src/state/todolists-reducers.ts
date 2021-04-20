import { v1 } from 'uuid'
import { FilterTypeValue, todolistTypeArr } from '../App'

type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  todolistID: string
}
type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
}

type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  todolistID: string
  title: string
}

type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  todolistID: string
  newFilterValue: FilterTypeValue
}

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export const todolistsReducer = (
  todolists: Array<todolistTypeArr>,
  action: ActionsType
): Array<todolistTypeArr> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todolists.filter((tl) => tl.id != action.todolistID)

    case 'ADD-TODOLIST':
      const newTodolistId = v1()
      const newTodolist: todolistTypeArr = {
        id: newTodolistId,
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
export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
  return {
    type: 'REMOVE-TODOLIST',
    todolistID: id,
  }
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: 'ADD-TODOLIST',
    title: title,
  }
}

export const ChangeTodolistTitleAC = (
  todolistID: string,
  title: string
): ChangeTodolistTitleActionType => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistID,
    title,
  }
}

export const ChangeTodolistFilterAC = (id: string, newValue: FilterTypeValue): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistID: id,
        newFilterValue: newValue
    }
  }