import React, { useState } from 'react'

const BlogForm = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = event => setTitle(event.target.value)
  const handleAuthorChange = event => setAuthor(event.target.value)
  const handleUrlChange = event => setUrl(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()
    props.handleSubmit({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <form onSubmit={handleSubmit} >
      title: <input className='title' id='title' value={title} onChange={handleTitleChange} />
        <br></br>
      author: <input className='author' id='author' value={author} onChange={handleAuthorChange} />
        <br></br>
      url: <input className='url' id='url' value={url} onChange={handleUrlChange} />
        <br></br>
        <input type='submit' value={'Submit'} />
      </form>
    </>
  )
}

export default BlogForm
