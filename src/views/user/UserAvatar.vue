<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import {ref} from 'vue'
import avatar from '@/assets/default.png'
const uploadRef = ref()
import {useTokenStore} from '@/stores/token.js'
const tokenStore = useTokenStore()

import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore()

//用戶頭像地址
const imgUrl= ref(userInfoStore.info.userPic)

//上傳成功的回調函數
const uploadSuccess = (result) => {
    imgUrl.value = result.data
    
}
import {userAvatarUpdateService} from '@/api/user.js'
import { ElMessage} from 'element-plus'
//頭像修改
const updateAvatar = async () => {
    let result = await userAvatarUpdateService(imgUrl.value)

    ElMessage.success(result.msg ? result.msg : '修改成功')

    //修改pinia中的數據
    userInfoStore.info.userPic = imgUrl.value
}

//@vitejs/plugin-vue": "^4.4.0" 升級到4.5.2版本會跳不明錯誤
//所以vite版本從5.x版降到4.5.2版

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>更換頭像</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-upload 
                    ref="uploadRef"
                    class="avatar-uploader" 
                    :show-file-list="false"
                    :auto-upload="true"
                    action="/api/upload"
                    name="file"
                    :headers="{'Authorization':tokenStore.token}"
                    :on-success="uploadSuccess"
                    >
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <img v-else src="avatar" width="278" />
                </el-upload>
                <br />
                <el-button type="primary" :icon="Plus" size="large"  @click="uploadRef.$el.querySelector('input').click()">
                    選擇圖片
                </el-button>
                <el-button type="success" :icon="Upload" size="large" @click="updateAvatar">
                    上傳頭像
                </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
        .avatar {
            width: 278px;
            height: 278px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 278px;
            height: 278px;
            text-align: center;
        }
    }
}
</style>