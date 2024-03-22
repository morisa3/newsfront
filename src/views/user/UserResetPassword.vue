<script setup>
import { ref } from 'vue'
import { userPwdUpdateService } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
//定義表單模型
const pwdData = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
})


//更新密碼，校驗密碼函數
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('請再次確認密碼'))
    } else if (value !== pwdData.value.new_pwd) {
        callback(new Error('兩次輸入的密碼不一致'))
    }  else{
        callback()
    }
}

//更新密碼，定義表單校驗規則函數
const rules = {
    old_pwd: [
        { required: true, message: '請輸入舊密碼', trigger: 'blur' },
        { min: 5, max: 16, message: '長度需為5到16位非空字符', trigger: 'blur' }
    ],
    new_pwd: [
        { required: true, message: '請輸入新密碼', trigger: 'blur' },
        { min: 5, max: 16, message: '長度需為5到16位非空字符', trigger: 'blur' }
    ],
    re_pwd: [
        { required: true, message: '請輸入新密碼', trigger: 'blur' },
        { validator: checkRePassword, trigger: 'blur' }
    ]
}



const updatePwdData = async () => {
    //調用端口
    let result = await userPwdUpdateService(pwdData.value)
    
    ElMessage.success(result.msg ? result.msg : '修改成功')
    //清空修改後數據
    pwdData.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
  }
    router.push('/login')
}

const clearPwdData = () => {
    passwordUpdateData.value.new_pwd = ''
    passwordUpdateData.value.re_pwd = ''
}

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>重置密碼</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="pwdData" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="原密碼" prop="old_pwd">
                        <el-input v-model="pwdData.old_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密碼" prop="new_pwd">
                        <el-input v-model="pwdData.new_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密碼確認" prop="re_pwd">
                        <el-input v-model="pwdData.re_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePwdData">提交修改</el-button>
                        <el-button @click="clearPwdData()">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>