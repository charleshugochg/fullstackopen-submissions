import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogCard from './BlogCard'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { notifyError } from '../reducers/notiReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(store => {
    return store.blogs.sort((a,b) => b.likes - a.likes)
  })
  const user = useSelector(store => store.user)

  const handleLike = async id => {
    try {
      const blogWillUpdate = blogs.find(b => b.id === id)
      dispatch(likeBlog(blogWillUpdate))
    } catch (err) {
      dispatch(notifyError(err.response.data.error))
    }
  }

  const handleRemove = async id => {
    const blogWillRemove = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog ${blogWillRemove.title} by ${blogWillRemove.author}`)) {
      try {
        dispatch(removeBlog(id, user))
      } catch (err) {
        dispatch(notifyError(err.response.data.error))
      }
    }
  }

  return (
    <div className='bloglist'>
      {blogs.map(blog => <BlogCard key={blog.id} {...blog} handleLike={handleLike} handleRemove={handleRemove} />)}
    </div>
  )
}

export default BlogList
