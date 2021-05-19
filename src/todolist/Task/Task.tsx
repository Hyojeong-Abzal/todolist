import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { EditableSpan } from '../../EditableSpan/EditableSpan';
import { changeTaskStatusAC, changeTaskTextAC, removeTaskAC } from '../../state/tasks-reducer';
import { TasksType } from '../Todolist';


export type TaskPropsType = {
    task: TasksType
    todolistId: string
}


export const Task = React.memo ( (props: TaskPropsType) => {
  
    let dispatch = useDispatch();


const onRemoveHadler = () => {
      dispatch(removeTaskAC(props.task.id, props.todolistId))
    };

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId))
    };

    const changeText = useCallback((text: string) => {
      dispatch(changeTaskTextAC(props.task.id, text, props.todolistId))
    }, [dispatch]);


    return (
      <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
          color={"primary"}
          checked={props.task.isDone}
          onChange={changeStatus}
        />

        <EditableSpan text={props.task.text} onChange={changeText} />
        <IconButton onClick={onRemoveHadler}>
          <Delete />
        </IconButton>
      </li>
    );
  });
