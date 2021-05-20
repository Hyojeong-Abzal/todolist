import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from "@storybook/addon-actions"
import { Task, TaskPropsType } from '../Task';
import { EditableSpan, EditableSpanPropsType } from '../EditableSpan';
import { AppWithRedux } from '../AppWithRedux';
import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProvidorDecorator';


export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as Meta;


const Template: Story = (args) => <AppWithRedux {...args} />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};



