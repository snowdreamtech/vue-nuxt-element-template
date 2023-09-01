<template>
    <div>
        <el-icon style="height:100%;" @click="click">
            <ElIconFullScreen v-if="isFullscreen" />
            <ElIconRank v-else />
        </el-icon>
    </div>
</template>
  
<script setup lang="ts">
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'

const isFullscreen = ref(false)

const change = () => {
    isFullscreen.value = screenfull.isFullscreen
}

onMounted(() => {
    if (screenfull.isEnabled) {
        screenfull.on('change', change)
    }
})

onDeactivated(() => {
    if (screenfull.isEnabled) {
        screenfull.off('change', change)
    }
})

const click = () => {
    if (!screenfull.isEnabled) {
        ElMessage.warning('you browser can not work')

        return false
    }

    screenfull.toggle()
}
</script>