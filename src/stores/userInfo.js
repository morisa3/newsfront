import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserInfoStore = defineStore('userInfo', () => {
    //定義狀態相關的內容

    //響應式變量
    const info = ref({})
    
    //定義函數，修改訊息
    const setInfo = () => {
        info.value = newInfo
    }
    //定義函數，移除訊息
    const removeInfo = () => {
        info.value = {}
    }

    return { info, setInfo, removeInfo }
    //持久化儲存
}, { persist: true })

export default useUserInfoStore