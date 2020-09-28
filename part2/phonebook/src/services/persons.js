import axios from 'axios';

const baseUrl = 'api/persons'

const getAll = () => {
  return axios
    .get(`${baseUrl}`)
    .then(res => {
      return res.data
    })
}

const create = (person) => {
  return axios
    .post(`${baseUrl}`, person)
    .then(res => {
      return res.data
    })
}

const update = (person) => {
  return axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(res => res.data)
}

const remove = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(res => res.data)
}

export default { getAll, create, update, remove }
