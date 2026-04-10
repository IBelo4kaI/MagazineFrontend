import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
   plugins: [vue(), vueDevTools()],
   server: {
      host: '192.168.88.2',
      port: 5180,
      https: {
         // Используем правильные пути
         key: fs.readFileSync(path.resolve(process.cwd(), 'key.pem')),
         cert: fs.readFileSync(path.resolve(process.cwd(), 'cert.pem')),
      },
      cors: true,
      proxy: {
         // '/api': {
         //    target: 'http://192.168.88.147:8080',
         //    changeOrigin: true,
         //    secure: false,
         //    ws: true, // Enable websocket proxying
         //    rewrite: (path) => path.replace(/^\/api/, '/api'),
         //    configure: (proxy, options) => {
         //       proxy.on('error', (err, _req, _res) => {
         //          console.log('proxy error', err)
         //       })
         //       proxy.on('proxyReq', (proxyReq, req, _res) => {
         //          console.log(
         //             'Sending Request to the Target:',
         //             req.method,
         //             req.url
         //          )
         //       })
         //       proxy.on('proxyRes', (proxyRes, req, _res) => {
         //          console.log(
         //             'Received Response from the Target:',
         //             proxyRes.statusCode,
         //             req.url
         //          )
         //       })
         //    },
         // },
         '/apisup': {
            target: 'http://192.168.88.2:8384',
            changeOrigin: true,
            secure: false,
            ws: true, // Enable websocket proxying
            rewrite: (path) => path.replace(/^\/apisup/, '/api'),
            configure: (proxy, options) => {
               proxy.on('error', (err, _req, _res) => {
                  console.log('proxy error', err)
               })
               proxy.on('proxyReq', (proxyReq, req, _res) => {
                  console.log(
                     'Sending Request to the Target:',
                     req.method,
                     req.url
                  )
               })
               proxy.on('proxyRes', (proxyRes, req, _res) => {
                  console.log(
                     'Received Response from the Target:',
                     proxyRes.statusCode,
                     req.url
                  )
               })
            },
         },
         '/apiref': {
            target: 'http://192.168.88.2:8388',
            changeOrigin: true,
            secure: false,
            ws: true, // Enable websocket proxying
            rewrite: (path) => path.replace(/^\/api/, '/api'),
            configure: (proxy, options) => {
               proxy.on('error', (err, _req, _res) => {
                  console.log('proxy error', err)
               })
               proxy.on('proxyReq', (proxyReq, req, _res) => {
                  console.log(
                     'Sending Request to the Target:',
                     req.method,
                     req.url
                  )
               })
               proxy.on('proxyRes', (proxyRes, req, _res) => {
                  console.log(
                     'Received Response from the Target:',
                     proxyRes.statusCode,
                     req.url
                  )
               })
            },
         },
      },
   },
   resolve: {
      alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
   },
})
