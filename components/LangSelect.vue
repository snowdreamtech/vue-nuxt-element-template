<template>
    <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
        <div>
            <el-icon>
                <ElIconSwitch />
            </el-icon>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :disabled="language === 'zh'" command="zh">
                    中文
                </el-dropdown-item>
                <el-dropdown-item :disabled="language === 'en'" command="en">
                    English
                </el-dropdown-item>
                <el-dropdown-item :disabled="language === 'es'" command="es">
                    Español
                </el-dropdown-item>
                <el-dropdown-item :disabled="language === 'ja'" command="ja">
                    日本語
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
  
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from "@/stores/app"
import { ElMessage } from 'element-plus'


const appStore = useAppStore()

// You need to use storeToRefs() to extract properties from the store while keeping those properties reactive.
// https://stackoverflow.com/a/71677026
const { language } = storeToRefs(appStore);

const handleSetLanguage = (lang: string) => {
    appStore.setLanguage(lang)

    ElMessage.success('Switch Language Success')
}

</script>  