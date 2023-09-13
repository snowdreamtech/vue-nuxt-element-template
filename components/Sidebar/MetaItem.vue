<template>
  <component :is="iconcomponent" v-if="iconcomponent" class="sub-el-icon" />

  <Icon v-if="!iconcomponent && icon" :name="icon" class="sub-el-icon" />

  <slot name="title">
    <span>{{ title }}</span>
  </slot>
</template>

<script setup lang="ts">
import { icons } from '@element-plus/icons-vue/global'

const props = defineProps({
  icon: {
    type: String,
    default: 'Edit'
  },
  title: {
    type: String,
    default: ''
  }
})

const iconcomponent = computed(() => {
  const ics = icons as SAObject
  return ics[props.icon]
})
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 2em;
  height: 2em;
}
</style>
