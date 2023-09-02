<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,
  name: 'externalLink',
  title: 'externalLink',
  icon: 'Link',
  index: 4,
  sidebar: true,
  layout: "dashboard",
  link: 'https://github.com/snowdreamtech/vue-nuxt-element-template',
})
</script>