import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import { AppRootStateType } from '../../state/store'
import { tasksReducer } from '../../state/tasks-reducer'
import { todolistsReducer } from '../../state/todolists-reducers'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        { id: "todolistId1", title: "What to learn", filter: "all" },
        { id: "todolistId2", title: "What to buy", filter: "all" }
    ],
    tasks: {
        ["todolistId1"]: [
            { id: v1(), text: "HTML&CSS", isDone: true },
            { id: v1(), text: "JS", isDone: true }
        ],
        ["todolistId2"]: [
            { id: v1(), text: "Milk", isDone: true },
            { id: v1(), text: "React Book", isDone: true }
        ]
    }

}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);
export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}