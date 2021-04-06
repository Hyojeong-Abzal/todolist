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
  const inputStyleError = {
    border: " 3px solid red",
    backgroundColor: "lightblue",
  };
  const inputStyle = {
    border: "solid 1px red",
    backgroundColor: "lightblue",
  };
  return editMode ? (
    <input
      style={error ? inputStyleError : inputStyle}
      value={newTaskText}
      autoFocus
      onBlur={offEditMode}
      onChange={onChangeHandler}
    />
  ) : (
    <span onDoubleClick={onEditMode}>{props.text}</span>
  );
}
