<template>
  <el-dropdown trigger="click" @command="handleSetLanguage">
    <el-icon style="height:100%;">
      <ElIconSwitch />
    </el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="locale === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="locale === 'en'" command="en">
          English
        </el-dropdown-item>
        <el-dropdown-item :disabled="locale === 'es'" command="es">
          Español
        </el-dropdown-item>
        <el-dropdown-item :disabled="locale === 'ja'" command="ja">
          日本語
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const { locale } = useI18n()

const handleSetLanguage = (lang: string) => {
  locale.value = lang

  ElMessage.success('Switch Language Success')
}

</script>
