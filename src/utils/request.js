//定制請求的實例

//導入axios  npm install axios
import axios from 'axios'
import { ElMessage } from 'element-plus'

//定義一個變數,記錄公共的首碼  ,  baseURL
const baseURL = '/api'
const instance = axios.create({ baseURL })

import { useTokenStore } from '@/stores/token.js'
//添加請求攔截器
instance.interceptors.request.use(
    (config) => {
        //請求前的回調
        //添加token
        const tokenStore = useTokenStore()
        //判斷有沒有token
        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token
        }
        return config
    },
    (err) => {
        //請求錯誤的回調
        Promise.reject(err)
    }
)
// import { useRouter } from 'vue-router'
// const router = useRouter()
import router from '@/router'

//添加回應攔截器
instance.interceptors.response.use(
    result => {
        //判斷狀態碼，成功
        if (result.data.code === 0) {
            return result.data
        }
        //判斷狀態碼，失敗
        //alert(result.data.msg ? result.data.msg : '服務異常')
        ElMessage.error(result.data.msg ? result.data.msg : '服務異常')
        //異步操作的狀態轉換為失敗
        return Promise.reject(result.data)
    },
    err => {
        //判斷回應狀態碼，如果為401則證明未登入，提示請登入並跳轉到登入頁面
        if(err.response.status === 401){
            ElMessage.error('請先登入')
            router.push('/login')
        }else{
            ElMessage.error('服務異常')
        }
        
        return Promise.reject(err) //非同步的狀態轉化成失敗的狀態
    }
)

export default instance

