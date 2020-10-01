const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')

const api = supertest(app)

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlZ2VuZCIsImlkIjoiNWY3NDczMzM0ZWY1YTM2ZDJjODhjMGUyIiwiaWF0IjoxNjAxNDczMTQ1fQ.SaJk7D0_XR_aGPv_UzMcfknHYX_PaQcsfr0DJKiYSQM'

const initialBlogs = [
  {
    author: 'john',
    title: 'Title 1',
    url: 'https://example.com',
    likes: 3
  },
  {
    author: 'john',
    title: 'Title 2',
    url: 'https://example.com',
    likes: 9
  },
  {
    author: 'snow',
    title: 'Title 3',
    url: 'https://example.com',
    likes: 5
  },
  {
    author: 'legend',
    title: 'Title 4',
    url: 'https://example.com',
    likes: 4
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const promises = initialBlogs.map(blog => new Blog(blog).save())

  await Promise.all(promises)
})

describe('when initial blogs are saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all initial blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length)
  })

  test('uniquie identifier id is defined', async() => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
  })
})

describe('addition of new blog', () => {
  test('post a new blog created successfully', async () => {
    const blog = {
      author: 'blake',
      title: 'Title 5',
      url: 'https://example.com',
      likes: 6
    }

    let res = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(res.body.title).toBe(blog.title)

    res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length + 1)

    const titles = res.body.map(blog => blog.title)
    expect(titles).toContain(blog.title)
  })

  test('create a blog without likes default to 0', async () => {
    const blog = {
      author: 'blake',
      title: 'Title 5',
      url: 'https://example.com',
    }
    
    let res = await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
    expect(res.body.likes).toBe(0)
  })

  test('create a blog with missing properties will get 400 error', async () => {
    const blog = {
      author: 'blake'
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length)

    const titles = res.body.map(blog => blog.title)
    expect(titles).not.toContain(blog.title)
  })
})

describe('deleting a blog', () => {
  test('successed with status code 204 if id exists', async () => {
    let res = await api.get('/api/blogs')
    let blogs = res.body

    const blogToDel = blogs[0]

    await api.delete(`/api/blogs/${blogToDel.id}`).expect(204)

    res = await api.get('/api/blogs')
    const titles = res.body.map(blog => blog.title)

    expect(titles).not.toContain(blogToDel.title)
  })
})

describe('updating a blog', () => {
  test('success with status code 200 if id exists', async () => {
    let res = await api.get('/api/blogs')
    let blogs = res.body

    const blogToUpdate = blogs[0]
    const blog = {
      ...blogToUpdate,
      likes: 10
    }
    
    res = await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(200)
    expect(res.body.likes).toBe(blog.likes)

    res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
