
<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 2" />
  </div>
</template>

  
<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
  name: "Menu2",
  title: "Menu2",
  icon: "",
  index: 1,
  sidebar: true,
  layout: "dashboard",
});
</script>
  