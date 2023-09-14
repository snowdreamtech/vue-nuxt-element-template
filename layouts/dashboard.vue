<template>
  <div :class="classObj" class="app-wrapper">
    <client-only>
      <resize-handler />
    </client-only>
    <div v-if="device==='mobile'&&appsidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useSettingsStore } from '@/stores/settings'

const appStore = useAppStore()
const settingsStore = useSettingsStore()

// You need to use storeToRefs() to extract properties from the store while keeping those properties reactive.
// https://stackoverflow.com/a/71677026
const { device } = storeToRefs(appStore)
const { fixedHeader } = storeToRefs(settingsStore)
const { closeSideBar } = appStore

const appsidebar = computed(() => {
  return appStore.sidebar
})

const classObj = computed(() => {
  return {
    hideSidebar: !appsidebar.value.opened,
    openSidebar: appsidebar.value.opened,
    withoutAnimation: appsidebar.value.withoutAnimation,
    mobile: device.value === 'mobile'
  }
})

const handleClickOutside = function () {
  closeSideBar(false)
}
</script>

<style lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.module.scss";
  @import "@/styles/index.scss";

.app-wrapper {
  @include clearfix;

  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
      position: fixed;
      top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
