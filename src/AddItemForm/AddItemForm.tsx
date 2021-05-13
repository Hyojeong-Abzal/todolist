import { Button, TextField } from '@material-ui/core'
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

type AddItemFormPropsType = {
  addItem: (title: string) => void // parents callback
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  console.log("AddItemForm is called")
  const [newTaskText, setNewTaskText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setNewTaskText(e.currentTarget.value)
  }
  const addItem = () => {
    const trimmedText = newTaskText.trim()
    if (trimmedText) {
      props.addItem(trimmedText)
    } else {
      setError('Title is required!')
    }
    setNewTaskText('')
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      addItem()
    }
  }

  return (
    <div>
      <TextField
        size={'small'}
        variant={'outlined'}
        value={newTaskText}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label={'Title'}
        error={!!error}
        helperText={error}
      />

      <Button variant="outlined" onClick={addItem}>
        <ControlPointIcon color="primary" />
      </Button>
    </div>
  )
});
