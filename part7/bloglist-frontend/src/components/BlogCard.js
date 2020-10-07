import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ id, title, author, url, likes, user, handleLike, handleRemove }) => {
  const [expand, setExpand] = useState(false)

  const style = {
    padding: 10,
    border: 'solid',
    borderWidth: 2,
    margin: 5
  }

  const handleExpand = () => setExpand(true)
  const handleHide = () => setExpand(false)

  return (
    <div className='blog' style={style}>
      {!expand ? (
        <>
          <Link to={`/blogs/${id}`}>{title}</Link> by {author} <button className='expand' onClick={handleExpand}>view</button>
        </>
      ) : (
        <>
          {title} by {author} <button className='hide' onClick={handleHide}>hide</button>
          <br />
          {url}
          <br />
          likes <span className='likes'>{likes}</span> <button onClick={() => handleLike(id)}>like</button>
          <br />
          {user.name}
          <br />
          <button onClick={() => handleRemove(id)}>remove</button>
        </>
      )}
    </div>
  )
}

export default BlogCard
