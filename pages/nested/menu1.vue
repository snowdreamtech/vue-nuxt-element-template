
<template>
  <div style="padding: 30px">
    <el-alert :closable="false" title="menu 1">
      <NuxtPage />
    </el-alert>
  </div>
</template>
  
  
<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
  name: "Menu1",
  title: "Menu1",
  icon: "",
  index: 0,
  sidebar: true,
  layout: "dashboard",
});
</script>
  