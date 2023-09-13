<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <el-icon width="64" height="64" :class="{ 'is-active': isActive }" class="hamburger">
      <ElIconExpand />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggle-click'])

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const toggleClick = () => {
  emit('toggle-click')
}

</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
