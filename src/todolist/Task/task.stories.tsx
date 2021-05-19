import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from "@storybook/addon-actions"

import { Task, TaskPropsType } from './Task';
import { ReduxStoreProviderDecorator } from '../../stories/decorators/ReduxStoreProviderDecorator';

const changeTaskStatus = action("Status changed inside Task");
const ChangeTaskTitle = action("Title changed inside Task");
const removeTask = action("remove Button insede Task clicked")

export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]


} as Meta;

const baseArgs = {
    changeTaskStatus,
    ChangeTaskTitle,
    removeTask
}

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});



TaskIsDoneExample.args = {
    ...baseArgs,
    task: { id: "1", text: "JS", isDone: true },
    todolistId: "todolist1"
}

export const TaskIsNotDoneExample = Template.bind({});

TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: { id: "2", text: "React", isDone: false },
    todolistId: "todolist1"
}
