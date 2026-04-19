import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,      // 可选，默认 5173
    open: true       // 启动后自动打开浏览器
  }
})
