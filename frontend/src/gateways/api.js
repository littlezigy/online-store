import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://ecommerce-demo-backend.herokuapp.com',
    withCredentials: true
})