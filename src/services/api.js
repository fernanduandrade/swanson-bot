import axios from 'axios'

const api = axios.create({
    baseURL: 'https://fcsapi.com/api-v3/forex/'
})

export default api;