//定義store
import { defineStore } from "pinia"
import { ref } from "vue"
/**
 * 第一個參數:名字(唯一)
 * 第二個參數:函數，函數的內部可以定義狀態的所有內容
 */

export const useTokenStore = defineStore('token', () => {
    //定義狀態的內容

    //1.響應式變量
    const token = ref('')

    //2.定義函數，修改token的值
    const setToken = (newToken) => {
        token.value = newToken
    }
    //3.定義函數，移除token的值
    const removeToken = () => {
        token.value = ''
    }

    return { token, setToken, removeToken }
    //持久化儲存
}, { persist: true })
