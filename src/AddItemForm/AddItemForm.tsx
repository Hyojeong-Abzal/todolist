import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void; // parents callback
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskText, setNewTaskText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setNewTaskText(e.currentTarget.value);
  };
  const addItem = () => {
    const trimmedText = newTaskText.trim();
    if (trimmedText) {
      props.addItem(trimmedText);
    } else {
      setError("Title is required!");
    }
    setNewTaskText("");
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      addItem();
    }
  };
  const errorMessage = error ? (
    <div className={"error-message"}>{error}</div>
  ) : null;

  return (
    <div>
      <input
        value={newTaskText}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error-Input" : ""}
      />
      <button onClick={addItem}>+</button>
      {errorMessage}
    </div>
  );
}
