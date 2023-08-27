<template>
  <NuxtLink v-if="isExternal(to)" :to="to" target="_blank">
    <slot />
  </NuxtLink>
  <NuxtLink v-else :to="to">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>
