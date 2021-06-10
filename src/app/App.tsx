import React from 'react'
import './App.css'
import { AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { AppRootStateType } from './store'
import { RequesStatusType } from './app-reducer'
import { useSelector } from 'react-redux'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'

function App() {
    const status = useSelector<AppRootStateType, RequesStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary" />}
            <Container fixed>
                <TodolistsList />
            </Container>
        </div>
    )
}

export default App
