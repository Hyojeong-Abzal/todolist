import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import "../App.css";
import { FilterTypeValue } from "../AppWithRedux";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from "../state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTextAC, removeTaskAC } from "../state/tasks-reducer";
import { Task } from "./Task/Task";


export type TasksType = {
  id: string;
  text: string;
  isDone: boolean;
};

type todolistType = {
  title: string;
  changeFilter: (value: FilterTypeValue, todolistId: string) => void;
  id: string;
  filter: FilterTypeValue;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (text: string, todolistId: string) => void;
};


export const Todolist: React.FC<todolistType> = React.memo((props) => {

  console.log("Todolist is called")


  const tasksArray = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[props.id]);
  let dispatch = useDispatch();


  const removeTodoList = () => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = useCallback((text: string) => {
    props.changeTodolistTitle(text, props.id);
  }, [dispatch])
  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(title, props.id))
  }, [dispatch]);
  let allTasks = tasksArray;
  let filterdTasks = allTasks;
  if (props.filter === "Active") {
    filterdTasks = allTasks.filter(t => t.isDone === false)
  }
  if (props.filter === "Completed") {
    filterdTasks = allTasks.filter(t => t.isDone === true)
  }

  const task = filterdTasks.map((task) => {
    <Task key={task.id} task={task} todolistId={props.id} />
  });

  const onAllClickHandler = useCallback(() => props.changeFilter("All", props.id), [props.changeFilter, props.id]);
  const onActiveClickHandler = useCallback(() => props.changeFilter("Active", props.id), [props.changeFilter, props.id]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter("Completed", props.id), [props.changeFilter, props.id]);



  return (
    <div className={"todoListWrapper"}>

      <h3 style={{ display: "flex" }}>
        <EditableSpan text={props.title} changeText={changeTodolistTitle} />
      </h3>

      <AddItemForm addItem={addTask} />
      <ul style={{ listStyle: "none", padding: "none" }}>{task}</ul>
      <div>
        <Button
          style={{ marginRight: "5px" }}
          size={"small"}
          variant={props.filter === "All" ? "contained" : "outlined"}
          color="primary"
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          style={{ marginRight: "5px" }}
          size={"small"}
          variant={props.filter === "Active" ? "contained" : "outlined"}
          color="primary"
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          style={{ marginRight: "5px" }}
          size={"small"}
          variant={props.filter === "Completed" ? "contained" : "outlined"}
          color="primary"
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
});



