<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'

//文章分類資料模型
const categorys = ref([
    {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "categoryName": "娛樂",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "categoryName": "經濟",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    }
])

//用戶搜索時選中的分類id
const categoryId = ref('')

//使用者搜索時選中的發佈狀態
const state = ref('')

//文章列表資料模型
const articles = ref([
    {
        "id": 4,
        "title": "台北旅遊攻略",
        "content": "101,西門町,故宮博物院...愛去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
        "id": 4,
        "title": "台北旅遊攻略",
        "content": "101,西門町,故宮博物院...愛去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
    {
        "id": 4,
        "title": "台北旅遊攻略",
        "content": "101,西門町,故宮博物院...愛去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },
])

//分頁條資料模型
const pageNum = ref(1)//當前頁
const total = ref(20)//總條數
const pageSize = ref(3)//每頁條數

//當每頁條數發生了變化，調用此函數
const onSizeChange = (size) => {
    pageSize.value = size
    articleList()
}
//當前頁碼發生變化，調用此函數
const onCurrentChange = (num) => {
    pageNum.value = num
    articleList()
}

//聲明異步函數
import { articleCategoryListService, articleListService, articleAddService } from '@/api/article.js'
//獲取文章分類列表數據
const articleCategoryList = async () => {
    let result = await articleCategoryListService()
    categorys.value = result.data
}

//獲取文章列表數據
const articleList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        categoryId: categoryId.value ? categoryId.value : null,
        state: state.value ? state.value : null
    }
    let result = await articleListService(params)

    //渲染到視圖上
    total.value = result.data.total
    articles.value = result.data.items

    //處理數據，給數據模型擴展一個屬性categoryName,分類名稱
    for (let i = 0; i < articles.value.length; i++) {
        let article = articles.value[i]
        for (let j = 0; j < categorys.value.length; j++) {
            if (article.categoryId == categorys.value[j].id) {
                article.categoryName = categorys.value[j].categoryName
            }
        }
    }
}
//調用獲取所有文章分類的函數
articleCategoryList()
//調用獲取所有文章列表的函數
articleList()

import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
//控制抽屜是否顯示
const visibleDrawer = ref(false)
//添加表單資料模型
const articleModel = ref({
    title: '',
    categoryId: '',
    coverImg: '',
    content: '',
    state: ''
})

//導入token
import { useTokenStore } from '@/stores/token.js'
const tokenStore = useTokenStore()

//上傳成功的回調函數
const uploadSuccess = (result) => {
    articleModel.value.coverImg = result.data
    console.log(result.data)
}

//添加文章
import { ElMessage } from 'element-plus'
const addArticle = async (clickState) => {
    //把發佈狀態賦值給數據模型
    articleModel.value.state = clickState

    //調用端口
    let result = await articleAddService(articleModel.value)
    ElMessage.success(result.msg ? result.msg : '添加成功')

    //讓抽屜消失
    visibleDrawer.value = false
    //調用獲取所有文章列表的函數
    articleList()
}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true">添加文章</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表單 -->
        <el-form inline>
            <el-form-item label="文章分類：">
                <el-select placeholder="請選擇" v-model="categoryId">
                    <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="發佈狀態：">
                <el-select placeholder="請選擇" v-model="state">
                    <el-option label="已發佈" value="已發佈"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="articleList">搜索</el-button>
                <el-button @click="categoryId = ''; state = ''">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="articles" style="width: 100%">
            <el-table-column label="文章標題" width="400" prop="title"></el-table-column>
            <el-table-column label="分類" prop="categoryName"></el-table-column>
            <el-table-column label="發表時間" prop="createTime"> </el-table-column>
            <el-table-column label="狀態" prop="state"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="沒有資料" />
            </template>
        </el-table>
        <!-- 分頁條 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

        <!-- 抽屜 -->
        <el-drawer v-model="visibleDrawer" title="添加文章" direction="rtl" size="50%">
            <!-- 添加文章表單 -->
            <el-form :model="articleModel" label-width="100px">
                <el-form-item label="文章標題">
                    <el-input v-model="articleModel.title" placeholder="請輸入標題"></el-input>
                </el-form-item>
                <el-form-item label="文章分類">
                    <el-select placeholder="請選擇" v-model="articleModel.categoryId">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章封面">
                    <!-- 圖片上傳功能 
                    :auto-upload=設置是否自動上傳 
                    action=設置端口路徑 
                    name=上傳的文件字段名 
                    :header={'Authorization':token}設置上傳的請求頭
                    :on-success=設置上傳成功的回調函數
                    -->
                    <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false" action="/api/upload"
                        name="file" :header="{ 'Authorization': tokenStore.token }" :on-success="uploadSuccess">
                        <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文章內容">
                    <div class="editor">
                        <quill-editor theme="snow" v-model:content="articleModel.content" contentType="html">
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addArticle('已發佈')">發佈</el-button>
                    <el-button type="info" @click="addArticle('草稿')">草稿</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>

    </el-card>
</template>


<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

/* 抽屜樣式 */
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
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
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>
