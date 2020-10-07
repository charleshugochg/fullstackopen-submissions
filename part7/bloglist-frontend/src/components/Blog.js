import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Badge
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser'

import { makeStyles } from '@material-ui/core/styles'
import { formStyle } from '../styles'

import { likeBlog, addComment } from '../reducers/blogReducer'
import { notifyError } from '../reducers/notiReducer'
import { useField } from '../hooks'

const useStyles = makeStyles(formStyle)

const Blog = () => {
  const { id } = useParams()
  const blog = useSelector(store => store.blogs.find(blog => blog.id === id))
  const dispatch = useDispatch()
  const [comment, resetComment] = useField('text')
  const classes = useStyles()

  const handleLike = () => {
    try {
      dispatch(likeBlog(blog))
    } catch (err) {
      notifyError(err.message)
    }
  }

  const handleAddComment = event => {
    event.preventDefault()
    try {
      dispatch(addComment(id, comment.value))
      resetComment()
    } catch (err) {
      notifyError(err.message)
    }
  }

  return (
    <>
      {blog &&
      <>
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='h5' component='h2'>{blog.title}</Typography>
            <Typography variant='overline' color='textSecondary'>added by {blog.user.name}</Typography>
          </CardContent>
          <CardActions>
            <IconButton color='primary' onClick={handleLike}>
              <Badge
                badgeContent={blog.likes}
                color='primary'>
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <Chip
              icon={<OpenInBrowserIcon />}
              label={blog.url}
              variant='outlined'
              color='primary'
              rel='noopener noreferrer'
              target='_blank'
              href={blog.url}
              component='a'
              clickable
            />
          </CardActions>
        </Card>
        <form className={classes.form} onSubmit={handleAddComment}>
          <TextField label='comment' {...comment}/>
          <Button>add</Button>
        </form>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              comments
            </ListSubheader>
          }>
          {blog.comments.map((c, i) => <ListItem key={i}><ListItemText primary={c} /></ListItem>)}
        </List>
      </>
      }
    </>
  )
}

export default Blog
