import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from "@storybook/addon-actions"
import { Task, TaskPropsType } from '../Task';
import { EditableSpan, EditableSpanPropsType } from '../EditableSpan';


export default {
    title: 'Todolist/EdiTableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: "value EditableSpan changed"
        },
        value: {
            defaultValue: "HTML",
            description: "Start value EditableSpan"
        }
    }
} as Meta;


const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange: action("Value EEditableSpan changed")
};



