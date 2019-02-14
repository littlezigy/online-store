import axios from 'axios'

export const USER = axios.create({
    baseURL: 'http://localhost:1337/user'
})
