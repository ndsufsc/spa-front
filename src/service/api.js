import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
    baseURL: 'https://backend-spa-teste-local.herokuapp.com',
    baseURL: 'https://backend-spa-teste-local.herokuapp.com/',
=======
    baseURL: 'https://backend-spa.herokuapp.com/',
>>>>>>> ef9db4f5bd0c3e045998b06b092084c03dd5ca8d
})

export default api;