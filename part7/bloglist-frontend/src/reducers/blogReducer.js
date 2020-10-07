import blogService from '../services/blogs'
import { notifyError, notifyMessage } from './notiReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_BLOG':
    return [
      ...state,
      action.data
    ]
  case 'INIT_BLOGS':
    return action.data
  case 'UPDATE_BLOG':
    return state.map(blog => (
      blog.id === action.data.id ? action.data : blog
    ))
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    } catch (err) {
      dispatch(notifyError(err.message))
    }
  }
}

export const createBlog = (blog, user) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.create(blog, user)
      dispatch({
        type: 'CREATE_BLOG',
        data: createdBlog
      })
      dispatch(notifyMessage(`a new blog ${createdBlog.title} added`))
    } catch (err) {
      dispatch(notifyError(err.response.data.error))
    }
  }
}

export const likeBlog= (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1
      })
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })
    } catch (err) {
      dispatch(notifyError(err.response.data.error))
    }
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.comment(id, comment)
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })
    } catch (err) {
      dispatch(notifyError(err.response.data.error))
    }
  }
}

export const removeBlog = (id, user) => {
  return async dispatch => {
    try {
      await blogService.remove(id, user)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id
      })
    } catch (err) {
      dispatch(notifyError(err.response.data.error))
    }
  }
}

export default reducer
