<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,
  name: 'External Link',
  title: 'External Link',
  icon: 'Link',
  index: 4,
  sidebar: true,
  layout: "dashboard",
  link: 'https://github.com/snowdreamtech/snowdream-admin',
})
</script>