import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    proxy:{
      '/api':{//獲取路徑中包含了/api的請求
          target:'http://localhost:8080',//後端服務所在的地址
          changeOrigin:true,//修改地址
          rewrite:(path)=>path.replace(/^\/api/,'')///api替換為''
      }
    }
  }

})
