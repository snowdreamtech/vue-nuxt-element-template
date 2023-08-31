
<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-3" type="success" />
  </div>
</template>

  
<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
  name: "menu1-3",
  title: "menu1-3",
  icon: "",
  index: 2,
  sidebar: true,
  layout: "dashboard",
});
</script>
  