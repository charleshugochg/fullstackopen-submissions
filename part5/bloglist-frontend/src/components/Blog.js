import React, { useState } from 'react'

const Blog = ({ id, title, author, url, likes, user, handleLike, handleRemove }) => {
  const [expand, setExpand] = useState(false)

  const style = {
    padding: 10,
    border: 'solid',
    borderWidth: 2,
    margin: 5
  }

  const handleExpand = () => setExpand(true)
  const handleHide = () => setExpand(false)

  const handleLikeButton = () => {
    handleLike(id, {
      title,
      author,
      url,
      likes: likes + 1,
      user: user.id
    })
  }

  const handleRemoveButton = () => {
    handleRemove(id)
  }

  return (
    <div className='blog' style={style}>
      {!expand ? (
        <>
          {title} by {author} <button className='expand' onClick={handleExpand}>view</button>
        </>
      ) : (
        <>
          {title} by {author} <button className='hide' onClick={handleHide}>hide</button>
          <br />
          {url}
          <br />
          likes <span className='likes'>{likes}</span> <button onClick={handleLikeButton}>like</button>
          <br />
          {user.name}
          <br />
          <button onClick={handleRemoveButton}>remove</button>
        </>
      )}
    </div>
  )
}

export default Blog
