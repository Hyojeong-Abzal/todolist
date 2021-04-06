import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import "./App.css";
import { filterTypeValue } from "./App";
import { AddItemForm } from "./AddItemForm/AddItemForm";
import { EditableSpan } from "./EditableSpan/EditableSpan";

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
  changeFilter: (value: filterTypeValue, todolistId: string) => void;
  addTask: (text: string, todolistId: string) => void;
  id: string;
  filter: filterTypeValue;
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
        <input type="checkbox" checked={t.isDone} onChange={changeStatus} />
        <EditableSpan text={t.text} changeText={changeText} />
        <button onClick={onRemoveHadler}>x</button>
      </li>
    );
  });

  const onAllClickHandler = () => props.changeFilter("All", props.id);
  const onActiveClickHandler = () => props.changeFilter("Active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("Completed", props.id);

  const AllButtonClass = props.filter === "All" ? "active-filter" : " ";
  const ActiveButtonClass = props.filter === "Active" ? "active-filter" : " ";
  const CompletedButtonClass =
    props.filter === "Completed" ? "active-filter" : " ";

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };
  const changeTodolistTitle = (text: string) => {
    props.changeTodolistTitle(text, props.id);
  };

  return (
    <div className={"todoListWrapper"}>
      <h3>
        <EditableSpan text={props.title} changeText={changeTodolistTitle} />
      </h3>

      <AddItemForm addItem={addTask} />

      <ul>{task}</ul>

      <div>
        <button className={AllButtonClass} onClick={onAllClickHandler}>
          All
        </button>
        <button className={ActiveButtonClass} onClick={onActiveClickHandler}>
          Active
        </button>
        <button
          className={CompletedButtonClass}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
        <button onClick={removeTodoList}>x</button>
      </div>
    </div>
  );
};
