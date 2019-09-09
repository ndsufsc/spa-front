import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-spa.herokuapp.com',
})

export default api;