import axios from 'axios'

export const bffAPI = axios.create({
  baseURL: '/',
})
