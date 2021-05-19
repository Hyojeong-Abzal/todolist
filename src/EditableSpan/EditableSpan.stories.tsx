import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from "@storybook/addon-actions"

import { EditableSpan, EditableSpanPropsType } from './EditableSpan';

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: "value EditableStan changed"
        }
    },
    text: {
        defaultValue: "HTML",
        description: "start value EditableStan"
    }

} as Meta;


const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});

EditableSpanExample.args = {
    text: "HTML",
    onChange: action('value EditableSpan changed')
}
