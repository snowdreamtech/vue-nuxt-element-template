<template>
  <div class="page-index">
    <Logos />
    <Examples />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
    key: (route) => route.fullPath,
    name: "dashboard",
    title: "Dashboard",
    icon: "Compass",
    index: 0,
    sidebar: true,
    layout: "dashboard",
});
</script>

<style>
.page-index {
  padding-top: 60px;
  text-align: center;
}
</style>
