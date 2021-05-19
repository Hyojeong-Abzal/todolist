import { TextField } from "@material-ui/core";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

export type EditableSpanPropsType = {
  text: string;
  onChange: (text: string) => void;
};
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log("EditableSpan is called")
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
      props.onChange(newTaskText);
      setError(false);
    } else {
      props.onChange(props.text);
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
});
