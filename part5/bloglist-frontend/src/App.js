import React, {useState, useEffect, useRef} from 'react'
import './App.css'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

import loginService from './services/login'
import blogsService from './services/blogs'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogs, setBlogs] = useState([])
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const blogFormRef = useRef()

  const handleUsernameChange = event => setUsername(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)

  const handleLogin = async event => {
    event.preventDefault()

    const credentials = {
      username,
      password
    }
    
    try {
      const user = await loginService.login(credentials)
      setUser(user)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (err) {
      console.error(err.message)
      notifyError(err.response.data.error)
    }
  }

  const handleLogout = event => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreate = async blog => {
    blogFormRef.current.toggleVisiblity()
    try {
      const createdBlog = await blogsService.create(blog, user)
      setBlogs(blogs.concat(createdBlog))
      notifyMessage(`a new blog ${createdBlog.title} added`)
    } catch (err) {
      console.error(err.message)
      notifyError(err.response.data.error)
    }
  }

  const handleLike = async (id, blog) => {
    try {
      const updatedBlog = await blogsService.update(id, blog, user)
      setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
    } catch (err) {
      console.error(err.message)
      notifyError(err.response.data.error)
    }
  }

  const handleRemove = async id => {
    const blogWillRemove = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog ${blogWillRemove.title} by ${blogWillRemove.author}`)) {
      try {
        await blogsService.remove(id, user)
        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (err) {
        console.error(err.message)
        notifyError(err.response.data.error)
      }
    }
  }

  const notifyMessage = message => {
    setMessage(message)
    setTimeout(() => setMessage(''), 5000)
  }

  const notifyError = message => {
    setError(message)
    setTimeout(() => setError(''), 5000)
  }

  useEffect(() => {
    const helper_fun = async () => {
      try {
        const blogs = await blogsService.getAll()
        setBlogs(blogs)
      } catch (err) {
        console.error(err.message)
        notifyError(err.response.data.error)
      }
    }
    helper_fun()
  }, [])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('loggedUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUser(user)
    }
  }, [])

  return (
    <>
      <Notification message={message} error={error} />
      {user === null ?
        <LoginForm 
          username={username} 
          password={password} 
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleLogin} />
        :
        <>
          <h2>blogs</h2>
          <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p> 
          <Toggleable label={'new blog'} ref={blogFormRef}>
            <BlogForm handleSubmit={handleCreate} />
          </Toggleable>
          <BlogList blogs={sortedBlogs} handleLike={handleLike} handleRemove={handleRemove}/>
        </>
      }
    </>
  )
}

export default App;
