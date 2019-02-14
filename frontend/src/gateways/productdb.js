import axios from 'axios'

export const PRODUCTS = axios.create({
    baseURL: 'http://localhost:1337/products'
})
