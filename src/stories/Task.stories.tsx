import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from "@storybook/addon-actions"
import { Task, TaskPropsType } from '../Task';


export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;

const changeTaskStatus = action("Status changed inside task");
const changeTaskTitle = action("Title changed inside Task");
const removeTask = action("Remove Button inside Task clicked")
const baseArgs = {
    changeTaskStatus,
    changeTaskTitle,
    removeTask
}


const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: { id: "1", isDone: true, title: "JS" },
    todolistId: "todolistId1"
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: { id: "2", isDone: false, title: "React" },
    todolistId: "todolistId1"
};

