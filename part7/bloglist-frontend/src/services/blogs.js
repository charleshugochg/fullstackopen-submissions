import axios from 'axios'

const baseUrl = '/api/blogs'

const authorize = user => user ? ({ headers: { Authorization: `bearer ${user.token}` } }) : ({})

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (blog, user) => {
  const res = await axios.post(baseUrl, blog, authorize(user))
  return res.data
}

const update = async (blog) => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return res.data
}

const comment = async (id, comment) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, {comment})
  return res.data
}

const remove = async (id, user) => {
  const res = await axios.delete(`${baseUrl}/${id}`, authorize(user))
  return res.data
}

export default {
  getAll,
  create,
  update,
  comment,
  remove
}
