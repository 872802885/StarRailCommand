import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/common': {
        target: 'https://api-static.mihoyo.com', // 目标服务器地址
        changeOrigin: true, // 是否更改源
      },
    },
  },
})
