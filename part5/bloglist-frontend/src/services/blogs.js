import axios from 'axios'

const baseUrl = '/api/blogs'

const authorize = user => user ? ({headers: { Authorization: `bearer ${user.token}`}}) : ({})

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (blog, user) => {
  const res = await axios.post(baseUrl, blog, authorize(user))
  return res.data
}

const update = async (id, blog, user) => {
  const res = await axios.put(`${baseUrl}/${id}`, blog, authorize(user))
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
  remove
}
