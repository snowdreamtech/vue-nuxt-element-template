<template>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
  name: "example",
  title: "example",
  icon: "Odometer",
  index: 1,
  sidebar: true,
  layout: "dashboard",
  redirect: { name: "Tree" },
});
</script>
