<template>
  <div :class="{ 'has-logo': showLogo }">
    <sidebar-logo v-if="showLogo" :collapse="true" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="menuBg"
        :text-color="menuText" :unique-opened="false" :active-text-color="menuActiveText"
        :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in router.options.routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>


<script setup lang="ts">
// import { storeToRefs } from 'pinia'
import { useAppStore } from "@/stores/app";
import { useSettingsStore } from "@/stores/settings";
import  variables from "@/styles/variables.scss";

// How to share variables between JS and SCSS? 
//https://github.com/vitejs/vite/discussions/9601#discussioncomment-3359769
//https://sergiocarracedo.es/2020/07/17/sharing-variables-between-scss-and-typescript/

const { menuText,menuActiveText,subMenuActiveText,menuBg,menuHover, subMenuBg,subMenuHover,sideBarWidth} = variables

// console.log(menuBg)

const appStore = useAppStore();
const settingsStore = useSettingsStore();
const route = useRoute();
const router = useRouter();

// You need to use storeToRefs() to extract properties from the store while keeping those properties reactive.
// https://stackoverflow.com/a/71677026
// const { sidebar } = storeToRefs(appStore);
// const { sidebarLogo } = storeToRefs(settingsStore); //maybe conflict with <sidebar-logo v-if="showLogo" :collapse="true" />

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});

const sidebar = computed(() => {
  return appStore.sidebar
});

const showLogo = computed(() => {
  return settingsStore.sidebarLogo
});

const isCollapse = computed(() => {
  return !sidebar.value.opened;
});

</script>
