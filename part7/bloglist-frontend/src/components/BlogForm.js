import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { formStyle } from '../styles'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'

const useStyles = makeStyles(formStyle)

const BlogForm = ({ onCreate }) => {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()

  const [title, resetTitle] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [url, resetUrl] = useField('text')

  const classes = useStyles()

  const handleSubmit = async event => {
    event.preventDefault()

    const blogWillCreate = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    dispatch(createBlog(blogWillCreate, user))

    resetTitle()
    resetAuthor()
    resetUrl()

    onCreate()
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit} >
        <div>
          <TextField id='outlined-basic' variant='outlined' label='title' {...title} />
        </div>
        <div>
          <TextField id='author' variant='outlined' label='author' {...author} />
        </div>
        <div>
          <TextField id='url' variant='outlined' label='url' {...url} />
        </div>
        <Button type='submit' color='primary'>Submit</Button>
      </form>
    </>
  )
}

export default BlogForm
