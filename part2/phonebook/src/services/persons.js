import axios from 'axios';

const baseUrl = 'https://polar-crag-65053.herokuapp.com/api'

const getAll = () => {
  return axios
    .get(`${baseUrl}/persons`)
    .then(res => {
      return res.data
    })
}

const create = (person) => {
  return axios
    .post(`${baseUrl}/persons`, person)
    .then(res => {
      return res.data
    })
}

const update = (person) => {
  return axios
    .put(`${baseUrl}/persons/${person.id}`, person)
    .then(res => res.data)
}

const remove = (id) => {
  return axios
    .delete(`${baseUrl}/persons/${id}`)
    .then(res => res.data)
}

export default { getAll, create, update, remove }
