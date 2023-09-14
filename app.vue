<script setup lang="ts">
import { title as defaultTitle } from '@/settings'

const route = useRoute()

const {
  t,
  te
} = useI18n()

const getPageTitle = (title : any) : string => {
  const pageMetaTitle = route.meta.title

  if (!pageMetaTitle || !te(`route.${pageMetaTitle}`)) {
    return t(title)
  }

  return t(`route.${pageMetaTitle}`) + ' - ' + t(title)
}

useHead({
  title: defaultTitle,
  titleTemplate: (title : any):string => {
    return getPageTitle(title)
  }
})

</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :throttle="0" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
.grayscale {
  filter: grayscale(100%);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  filter: grayscale(1);
}

html {
  font-family: PingFang-SC-Regular, Helvetica, sans-serif;
  font-size: 20px;
  word-spacing: 1px;
  text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  width: 100vw;
  height: 100vh;
}

body {
  width: 100vw;
  height: 100vh;
}

#__nuxt {
  width: 100vw;
  height: 100vh;
}
</style>
