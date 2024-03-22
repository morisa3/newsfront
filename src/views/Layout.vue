<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'

//調用函數，獲取用戶信息
import {userInfoService} from '@/api/user.js'
import { useTokenStore } from '@/stores/token.js'
import useUserInfoStore from '@/stores/userInfo.js'
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore()

//調用函數,獲取使用者詳細資訊
const getUserInfo = async()=>{
    //調用端口
    let result = await userInfoService();
    //資料存儲到pinia中
    userInfoStore.setInfo(result.data);
}

getUserInfo();
//條目被點擊後，調用的函數
import { useRouter } from 'vue-router'
const router = useRouter()
import { ElMessage, ElMessageBox } from 'element-plus'
const handleCommand = (command) => {
    //判斷指令
    if (command === 'logout') {
        //提示用戶，確認框，退出登入
        ElMessageBox.confirm(
            '是否退出登入?',
            '溫馨提示',
            {
                confirmButtonText: '確認',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {
                //退出登入
                //1.清空pinia中儲存的token與個人信息
                tokenStore.removeToken()
                userInfoStore.removeInfo()

                //2.跳轉到登入頁面
                router.push('/login')
                ElMessage({
                    type: 'success',
                    message: '退出登入成功',
                })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消操作',
                })
            })
    } else {
        //router
        router.push('/user/' + command)
    }
}

</script>

<template>
    <!-- element-plus容器 -->
    <el-container class="layout-container">
        <!-- 左側菜單 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>
                <el-menu-item index="/article/category">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>文章分類</span>
                </el-menu-item>
                <el-menu-item index="/article/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-sub-menu>
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>個人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本資料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更換頭像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密碼</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右側主區域 -->
        <el-container>
            <!-- 頭部區域 -->
            <el-header>
                <div>登入用戶暱稱：<strong>{{ userInfoStore.info.nickname }}</strong></div>
                <!-- 下拉菜單 -->
                <!-- command: 條目被點擊後會觸發，在事件函數上可以聲明一個參數，接收條目對應的指令-->
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.userPic ? userInfoStore.info.userPic:avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="info" :icon="User">基本資料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更換頭像</el-dropdown-item>
                            <el-dropdown-item command="resetPassword" :icon="EditPen">重設密碼</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登錄</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中間區域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
            <!-- 底部區域 -->
            <el-footer>新聞管理 ©2024 Created by moris</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>
