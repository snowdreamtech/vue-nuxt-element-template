
<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-2" type="success">
      <NuxtPage />
    </el-alert>
  </div>
</template>
  
<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
  name: "menu1-2",
  title: "menu1-2",
  icon: "",
  index: 1,
  sidebar: true,
  layout: "dashboard",
});
</script>
  