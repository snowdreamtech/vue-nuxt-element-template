
<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-1" type="success">
      <NuxtPage />
    </el-alert>
  </div>
</template>
  
<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
  name: "menu1-1",
  title: "menu1-1",
  icon: "",
  index: 0,
  sidebar: true,
  layout: "dashboard",
});
</script>
  