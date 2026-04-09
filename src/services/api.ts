import axios from 'axios'

export const magApi = axios.create({
   baseURL: 'http://localhost:8080/api/mag/v1/',
   withCredentials: true,
})

export const refApi = axios.create({
   baseURL: 'http://192.168.88.2:8388',
   withCredentials: true,
})

export const supplyApi = axios.create({
   baseURL: 'http://192.168.88.2:8384/api/supply/',
   withCredentials: true,
})
