//導入request.js請求工具
import request from '@/utils/request.js'

//提供調用註冊接口的函數
export const userRegisterService = (registerData) => {
    //使用UrlSearchParams完成傳遞
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key, registerData[key])
    }
    return request.post('/user/register', params)
}

//提供調用登入接口的函數
export const userLoginService = (loginData) => {
    const params = new URLSearchParams()
    for (let key in loginData) {
        params.append(key, loginData[key])
    }
    return request.post('/user/login', params)
}

//獲取使用者詳細資訊
export const userInfoService = ()=>{
    return request.get('/user/userInfo')
}


//修改用戶信息
export const userInfoUpdateService = (userInfoData) => {
    return request.put('/user/update',userInfoData)
}

//修改用戶頭像
export const userAvatarUpdateService = (avatarUrl)=>{
    const params = new URLSearchParams()
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}

//修改用戶密碼
export const userPwdUpdateService = (pwdData) =>{
    return request.patch('/user/updatePwd',pwdData)
}
