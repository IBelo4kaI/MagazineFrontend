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
   baseURL: '/apisup/supply',
   withCredentials: true,
})

export const checkoApi = axios.create({
   baseURL: 'https://api.checko.ru/v2/'
})

function createErrorInterceptor() {
   return (error: any) => {
      if (error.response?.status === 401) {
         const currentUrl = encodeURIComponent(window.location.href)
         window.location.href = `https://sso.st29.ru/?url=${currentUrl}`
         return
      } else if (error.response?.status === 403) {
         return error
      }
      return Promise.reject(error)
   }
}

refApi.interceptors.response.use(
   (response) => response,
   createErrorInterceptor()
)
supplyApi.interceptors.response.use(
   (response) => response,
   createErrorInterceptor()
)
