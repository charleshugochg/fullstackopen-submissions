import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { Container, AppBar, Toolbar, Button, Typography } from '@material-ui/core'

import { initBlogs } from './reducers/blogReducer'
import { recover, logout } from './reducers/userReducer'

import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import Users from './components/Users'
import User from './components/User'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const blogFormRef = useRef()

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(recover())
  }, [dispatch])

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
              <em>{user.username} logged in</em>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Notification />
        <Typography variant="h1">blogs</Typography>
        <Switch>
          <Route exact path="/">
            <Toggleable label={'new blog'} ref={blogFormRef}>
              <BlogForm
                onCreate={() => blogFormRef.current.toggleVisiblity()}
              />
            </Toggleable>
            <BlogList />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/:id">
            <User />
          </Route>
          <Route exact path="/blogs/:id">
            <Blog />
          </Route>
          <Route exact path="/login" render={() =>
            user ? <Redirect to="/" /> : <LoginForm />
          } />
        </Switch>
      </Container>
    </Router>
  )
}

export default App
