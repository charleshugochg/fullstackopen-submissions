import React from 'react'
import {
  Link,
} from 'react-router-dom'
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'

import { useUsers } from '../hooks'

const Users = () => {
  const users = useUsers()

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          {users.map(user =>
            <TableRow key={user.id}>
              <TableCell>
                <Button
                  component={Link}
                  to={`/users/${user.id}`}
                  startIcon={<PersonIcon />}
                >
                  {user.name}
                </Button>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>)}
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
