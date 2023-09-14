<template>
  <section class="app-main">
    <nuxt-page v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="key" />
      </transition>
    </nuxt-page>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()

const key = computed(() => {
  return route.path
})
</script>

<style lang="scss" scoped>

.app-main {
  /* 50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
