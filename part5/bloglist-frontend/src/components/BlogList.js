import React from 'react'
import Blog from './Blog'

const BlogList = props => {
  return (
    <div className='bloglist'>
      {props.blogs.map(blog => <Blog key={blog.id} {...blog} handleLike={props.handleLike} handleRemove={props.handleRemove} />)}
    </div>
  )
}

export default BlogList
