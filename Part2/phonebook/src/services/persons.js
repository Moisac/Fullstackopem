import axios from 'axios';
const url = 'http://localhost:3001/persons';

const getPersons = () => {
    return axios.get(url)
}

const addPerson = (phonebookObj) => {
    return axios.post(url, phonebookObj)
}

const deletePerson = (id) => {

    const request = axios.delete(`${url}/${id}`)
    return request.then(response =>response.data)
}

const updateNumber = (id, newPhonebookObj) => {
    const request = axios.put(`${url}/${newPhonebookObj.id}`, newPhonebookObj)
    return request.then(response => response.data)
}

export default { getPersons, addPerson, deletePerson, updateNumber }