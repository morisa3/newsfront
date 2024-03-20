<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
//控制註冊與登錄表單的顯示， 預設顯示註冊
const isRegister = ref(false)
//定義數據模型
const registerData = ref({
    username: '',
    password: '',
    rePassword: ''
})

//註冊登入端，校驗密碼函數
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('請再次確認密碼'))
    } else if (value !== registerData.value.password) {
        callback(new Error('兩次輸入的密碼不一致'))
    } else {
        callback()
    }
}

//註冊端，定義表單校驗規則函數
const rules = {
    username: [
        { required: true, message: '請輸入用戶名', trigger: 'blur' },
        { min: 5, max: 16, message: '長度需為5到16位非空字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '請輸入密碼', trigger: 'blur' },
        { min: 5, max: 16, message: '長度需為5到16位非空字符', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}

//註冊端，調用後端端口，完成註冊
import { userRegisterService, userLoginService } from '@/api/user.js';
const register = async () => {
    //registerData為響應式對象，如果需要獲取值，需要加上.value
    let result = await userRegisterService(registerData.value);

    // if (result.code === 0) {
    //     alert(result.msg ? result.mag : '註冊成功');
    // } else {
    //     alert('註冊失敗')
    // }
    //alert(result.msg ? result.mag : '註冊成功');
    ElMessage.success(result.msg ? result.msg : '註冊成功');
}

//登入端，綁定數據
//複用註冊，校驗數據模型
//登入函數
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token.js'
const router = useRouter()
const tokenStore = useTokenStore()
const login = async () => {
    //調用後端端口，完成登入
    let result = await userLoginService(registerData.value);

    // if (result.code === 0) {
    //     alert(result.msg ? result.mag : '登入成功');
    // } else {
    //     alert('登入失敗')
    // }
    //alert(result.msg ? result.mag : '登入成功');
    ElMessage.success(result.msg ? result.msg : '登入成功');
    //把得到的token儲存到pinia中
    tokenStore.setToken(result.data)
    //跳轉到首頁，借助路由完成跳轉
    router.push('/')
}

//定義函數，清空數據模型的數據
const clearRegisterData = () => {
    registerData.value = {
        username: '',
        password: '',
        rePassword: ''
    }
}

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 註冊表單 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>註冊</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="請輸入用戶名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="請輸入密碼"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="請輸入再次密碼"
                        v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 註冊按鈕 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        註冊
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登錄表單 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登錄</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="請輸入用戶名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="請輸入密碼"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>記住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘記密碼？</el-link>
                    </div>
                </el-form-item>
                <!-- 登錄按鈕 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登錄</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true; clearRegisterData()">
                        註冊 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 樣式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
