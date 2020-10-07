import React from 'react'
import { useParams } from 'react-router-dom'
import { useUsers } from '../hooks'

const User = () => {
  const { id } = useParams()
  const users = useUsers()
  const user = users.find(u => u.id === id)

  return (
    <>
      {user &&
        <>
          <h2>{user.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
          </ul>
        </>
      }
    </>
  )
}

export default User
