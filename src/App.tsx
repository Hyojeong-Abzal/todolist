import React, { useState } from 'react'
import './App.css'
import { tasksType, Todolist } from './todolist/Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm/AddItemForm'
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'

export type FilterTypeValue = 'All' | 'Active' | 'Completed'
export type todolistTypeArr = {
  id: string
  title: string
  filter: FilterTypeValue
}
export type TasksStateType = {
  [key: string]: Array<tasksType>
}

function App() {
  let todolistId1 = v1()
  let todolistId2 = v1()

  const [todolists, setTodolists] = useState<Array<todolistTypeArr>>([
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' },
  ])
  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), text: 'HTML and CSS', isDone: true },
      { id: v1(), text: 'JS', isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), text: 'Milk', isDone: true },
      { id: v1(), text: 'React book', isDone: true },
    ],
  })

  function changeTaskStatus(
    taskID: string,
    isDoneValue: boolean,
    todolistId: string
  ) {
    let todolistTasks = tasks[todolistId]
    let task = todolistTasks.find((t) => t.id === taskID)
    if (task) {
      task.isDone = isDoneValue
      setTasks({ ...tasks })
    }
  }
  function changeTaskText(taskID: string, text: string, todolistId: string) {
    let todolistTasks = tasks[todolistId]
    let task = todolistTasks.find((t) => t.id === taskID)
    if (task) {
      task.text = text
      setTasks({ ...tasks })
    }
  }

  function addTask(text: string, todolistId: string) {
    let newTask = { id: v1(), text: text, isDone: false }
    let todolistTasks = tasks[todolistId]
    tasks[todolistId] = [newTask, ...todolistTasks]
    setTasks({ ...tasks })
  }

  function removeTask(id: string, todolistId: string) {
    let todolistTasks = tasks[todolistId]
    tasks[todolistId] = todolistTasks.filter((t) => t.id != id)

    setTasks({ ...tasks })
  }



  function changeFilter(value: FilterTypeValue, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  function removeTodolist(id: string) {
    setTodolists(todolists.filter((tl) => tl.id != id))
    delete tasks[id]
    setTasks({ ...tasks })
  }
  function getTasksForTodoList(todoList: todolistTypeArr): Array<tasksType> {
    switch (todoList.filter) {
      case 'Active':
        return tasks[todoList.id].filter((t) => t.isDone === false)
      case 'Completed':
        return tasks[todoList.id].filter((t) => t.isDone === true)
      default:
        return tasks[todoList.id]
    }
  }
  const addTodolist = (title: string) => {
    const newTodolistId = v1()
    const newTodolist: todolistTypeArr = {
      id: newTodolistId,
      title,
      filter: 'All',
    }
    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasks, [newTodolistId]: [] })
  }
  const changeTodolistTitle = (text: string, todolistId: string) => {
    const updatedTodolits = todolists.map((tl) =>
      tl.id === todolistId ? { ...tl, title: text } : tl
    )
    setTodolists(updatedTodolits)
  }



  const todolistComponents = todolists.map((tl) => {
    const tasksFilter = getTasksForTodoList(tl)
    return (
      <Grid item key={tl.id}>
        <Paper style={{ padding: "15px", borderRadius: "15px" }} elevation={7}>
          <Todolist

            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            changeTaskStatus={changeTaskStatus}
            changeTaskText={changeTaskText}
            tasks={tasksFilter}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            removeTodolist={removeTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
        </Paper>
      </Grid>
    )
  })
  return (
    <div className="Todolist">
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">Todolists</Typography>
          <Button variant={'outlined'} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px 0px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={5}>
          {todolistComponents}
        </Grid>
      </Container>

    </div>
  )
}

export default App


