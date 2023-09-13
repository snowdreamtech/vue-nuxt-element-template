<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-2-2" type="warning" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,
  name: 'Menu1-2-2',
  title: 'Menu1-2-2',
  icon: '',
  index: 1,
  sidebar: true,
  layout: 'dashboard'
})
</script>
