import { TextField } from "@material-ui/core";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
  text: string;
  changeText: (text: string) => void;
};
export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTaskText, setNewTaskText] = useState(props.text);
  const [error, setError] = useState<boolean>(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.currentTarget.value);
    if (e.currentTarget.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };
  const onEditMode = () => setEditMode(true);
  const offEditMode = () => {
    setEditMode(false);
    const trimmedTaskText = newTaskText.trim();
    if (trimmedTaskText) {
      props.changeText(newTaskText);
      setError(false);
    } else {
      props.changeText(props.text);
      setNewTaskText(props.text);
    }
  };

  return editMode ? (
    <TextField
      error={!!error}
      color={"primary"}
      variant={"standard"}
      value={newTaskText}
      autoFocus
      onBlur={offEditMode}
      onChange={onChangeHandler}
    />
  ) : (
    <span onDoubleClick={onEditMode}>{props.text}</span>
  );
}
