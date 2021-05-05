import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import "../App.css";
import { FilterTypeValue } from "../App";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export type tasksType = {
  id: string;
  text: string;
  isDone: boolean;
};

type todolistType = {
  changeTaskStatus: (
    taskID: string,
    isDoneValue: boolean,
    todolistId: string
  ) => void;
  changeTaskText: (taskID: string, text: string, todolistId: string) => void;
  title: string;
  tasks: Array<tasksType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterTypeValue, todolistId: string) => void;
  addTask: (text: string, todolistId: string) => void;
  id: string;
  filter: FilterTypeValue;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (text: string, todolistId: string) => void;
};

export const Todolist: React.FC<todolistType> = (props) => {
  const removeTodoList = () => {
    props.removeTodolist(props.id);
  };
  const task = props.tasks.map((t) => {
    const onRemoveHadler = () => {
      props.removeTask(t.id, props.id);
    };
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
    const changeText = (text: string) => {
      props.changeTaskText(t.id, text, props.id);
    };

    return (
      <li key={t.id} className={t.isDone ? "is-done" : ""}>
        <Checkbox
          color={"primary"}
          checked={t.isDone}
          onChange={changeStatus}
        />

        <EditableSpan text={t.text} changeText={changeText} />
        <IconButton onClick={onRemoveHadler}>
          <Delete />
        </IconButton>
      </li>
    );
  });

  const onAllClickHandler = () => props.changeFilter("All", props.id);
  const onActiveClickHandler = () => props.changeFilter("Active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("Completed", props.id);

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };
  const changeTodolistTitle = (text: string) => {
    props.changeTodolistTitle(text, props.id);
  };

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
};
