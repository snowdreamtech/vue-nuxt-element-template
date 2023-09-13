<template>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,
  name: 'nested',
  title: 'nested',
  icon: 'Menu',
  index: 3,
  sidebar: true,
  layout: 'dashboard',
  redirect: { name: 'Menu1' }
})
</script>
