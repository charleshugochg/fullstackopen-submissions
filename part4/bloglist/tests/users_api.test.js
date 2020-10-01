const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')

const api = supertest(app)

const rootUser = {
  username: 'root',
  name: 'Superuser',
  passwordHash: 'FAKEHASH'
}

const testUser = {
  username: 'eunna',
  name: 'Eunna Emola',
  password: 'kindafussy'
}

const usernamesInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.username)
}

describe('Creating a user', () => {
  beforeEach(async () => {
    await User.deleteMany({}) 

    const user = new User(rootUser)
    await user.save()
  })

  test('successed with status 201 if credentials are valid and created', async () => {
    const res = await api.post('/api/users').send(testUser).expect(201).expect('Content-Type', /application\/json/)
    expect(res.body.id).toBeDefined()

    const usernames = await usernamesInDb()
    expect(usernames).toContain(testUser.username)
  })

  test('failed with error 400 if username is less than 3 and not created', async () => {
    const userWillCreate = {
      ...testUser,
      username: 'en'
    }

    const res = await api.post('/api/users').send(userWillCreate).expect(400)
    expect(res.body.error).toBeDefined()

    const usernames = await usernamesInDb()
    expect(usernames).not.toContain(userWillCreate.username)
  })

  test('failed with error 400 if password is less than 3 and not created', async () => {
    const userWillCreate = {
      ...testUser,
      password: 'as'
    }

    const res = await api.post('/api/users').send(userWillCreate).expect(400)
    expect(res.body.error).toBeDefined()

    const usernames = await usernamesInDb()
    expect(usernames).not.toContain(userWillCreate.username)
  })

  test('failed with error 400 if username is not given and not created', async () => {
    const userWillCreate = {
      password: testUser.password,
      name: testUser.name
    }

    const res = await api.post('/api/users').send(userWillCreate).expect(400)
    expect(res.body.error).toBeDefined()

    const usernames = await usernamesInDb()
    expect(usernames).not.toContain(userWillCreate.username)
  })

  test('failed with error 400 if password is not given and not created', async () => {
    const userWillCreate = {
      username: testUser.username,
      name: testUser.name
    }

    const res = await api.post('/api/users').send(userWillCreate).expect(400)
    expect(res.body.error).toBeDefined()

    const usernames = await usernamesInDb()
    expect(usernames).not.toContain(userWillCreate.username)
  })

  test('failed with error 400 if username is already existed', async () => {
    const userWillCreate = {
      ...testUser,
      username: 'root'
    }

    const res = await api.post('/api/users').send(userWillCreate).expect(400)
    expect(res.body.error).toBeDefined()

    const usernames = await usernamesInDb()
    expect(usernames).toContain(userWillCreate.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
