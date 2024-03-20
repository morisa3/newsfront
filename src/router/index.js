//導入vue-router
import { createRouter, createWebHistory } from 'vue-router'
//導入組件
import LoginVue from "@/views/Login.vue"
import LayoutVue from "@/views/Layout.vue"
// 導入子組件
import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'

//定義路由器關係
const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/', component: LayoutVue, redirect: '/article/manage', 
        children: [
            { path: '/article/category', component: ArticleCategoryVue },
            { path: '/article/manage', component: ArticleManageVue },
            { path: '/user/info', component: UserInfoVue },
            { path: '/user/avatar', component: UserAvatarVue },
            { path: '/user/resetPassword', component: UserResetPasswordVue }
        ]
    }
]

//創建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//導出路由器
export default router