import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-spa-teste-local.herokuapp.com',
    baseURL: 'https://backend-spa-teste-local.herokuapp.com/',
})

export default api;