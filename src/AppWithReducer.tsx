import React, { useReducer, useState } from 'react'
// import './App.css'
// import { tasksType, Todolist } from './todolist/Todolist'
// import { v1 } from 'uuid'
// import { AddItemForm } from './AddItemForm/AddItemForm'
// import {
//   AppBar,
//   Button,
//   Container,
//   Grid,
//   IconButton,
//   Paper,
//   Toolbar,
//   Typography,
// } from '@material-ui/core'
// import { Menu } from '@material-ui/icons'
// import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './state/todolists-reducers'
// import { addTaskAC, changeTaskStatusAC, changeTaskTextAC, removeTaskAC, tasksReducer } from './state/tasks-reducer'

// export type FilterTypeValue = 'All' | 'Active' | 'Completed'
// export type todolistTypeArr = {
//   id: string
//   title: string
//   filter: FilterTypeValue
// }
// export type TasksStateType = {
//   [key: string]: Array<tasksType>
// }

// export function AppWithReducer() {
//   let todolistId1 = v1()
//   let todolistId2 = v1()

//   const [todolists, dispathcTodolists] = useReducer(todolistsReducer, [
//     { id: todolistId1, title: 'What to learn', filter: 'All' },
//     { id: todolistId2, title: 'What to buy', filter: 'All' },
//   ])
//   const [tasks, dispathcTasks] = useReducer(tasksReducer, {
//     [todolistId1]: [
//       { id: v1(), text: 'HTML and CSS', isDone: true },
//       { id: v1(), text: 'JS', isDone: true },
//     ],
//     [todolistId2]: [
//       { id: v1(), text: 'Milk', isDone: true },
//       { id: v1(), text: 'React book', isDone: true },
//     ],
//   })

//   function changeTaskStatus(
//     taskID: string,
//     isDoneValue: boolean,
//     todolistId: string
//   ) {
//     dispathcTasks(changeTaskStatusAC(taskID, isDoneValue, todolistId))
//   }
//   function changeTaskText(taskID: string, text: string, todolistId: string) {
//     dispathcTasks(changeTaskTextAC(taskID, text, todolistId))
//   }
//   function addTask(text: string, todolistId: string) {
//     dispathcTasks(addTaskAC(text, todolistId))
//   }
//   function removeTask(id: string, todolistId: string) {
//     dispathcTasks(removeTaskAC(id, todolistId))
//   }





//   // todolist
//   function changeFilter(value: FilterTypeValue, todolistId: string) {
//     dispathcTodolists(changeTodolistFilterAC(todolistId, value))
//   }
//   const changeTodolistTitle = (text: string, todolistId: string) => {
//     dispathcTodolists(changeTodolistTitleAC(text, todolistId))
//   }
//   function removeTodolist(id: string) {
//     dispathcTasks(removeTodolistAC(id))
//     dispathcTodolists(removeTodolistAC(id))
//   }
//   const addTodolist = (title: string) => {
//     let action = addTodolistAC(title)
//     dispathcTasks(action)
//     dispathcTodolists(action)

//   }


//   function getTasksForTodoList(todoList: todolistTypeArr): Array<tasksType> {
//     switch (todoList.filter) {
//       case 'Active':
//         return tasks[todoList.id].filter((t) => t.isDone === false)
//       case 'Completed':
//         return tasks[todoList.id].filter((t) => t.isDone === true)
//       default:
//         return tasks[todoList.id]
//     }
//   }

//   const todolistComponents = todolists.map((tl) => {
//     const tasksFilter = getTasksForTodoList(tl)
//     return (
//       <Grid item key={tl.id}>
//         <Paper style={{ padding: "15px", borderRadius: "15px" }} elevation={7}>
//           <Todolist

//             id={tl.id}
//             title={tl.title}
//             filter={tl.filter}
//             changeTaskStatus={changeTaskStatus}
//             changeTaskText={changeTaskText}
//             tasks={tasksFilter}
//             removeTask={removeTask}
//             changeFilter={changeFilter}
//             addTask={addTask}
//             removeTodolist={removeTodolist}
//             changeTodolistTitle={changeTodolistTitle}
//           />
//         </Paper>
//       </Grid>
//     )
//   })
//   return (
//     <div className="Todolist">
//       <AppBar position="static">
//         <Toolbar style={{ justifyContent: 'space-between' }}>
//           <IconButton edge="start" color="inherit" aria-label="menu">
//             <Menu />
//           </IconButton>
//           <Typography variant="h6">Todolists</Typography>
//           <Button variant={'outlined'} color="inherit">
//             Login
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Container fixed>
//         <Grid container style={{ padding: "20px 0px" }}>
//           <AddItemForm addItem={addTodolist} />
//         </Grid>
//         <Grid container spacing={5}>
//           {todolistComponents}
//         </Grid>
//       </Container>

//     </div>
//   )
// }




