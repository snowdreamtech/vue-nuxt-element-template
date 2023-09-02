<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">
          {{ t('route.' + item.meta.title) }} 
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ t('route.' + item.meta.title) }} </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { compile } from 'path-to-regexp';

const {
  t,
} = useI18n()

const route = useRoute();
const router = useRouter();

const levelList = ref()


const getBreadcrumb = () => {
  // only show routes with meta.title
  let matched = route.matched.filter(item => item.meta && item.meta.title)
  const first = matched[0]

  if (!isDashboard(first)) {
    let dashboardRouteLocationMatched:any[] = [{ path: '/', meta: { title: 'dashboard' } }]
    matched = dashboardRouteLocationMatched.concat(matched)
  }

  levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
);

onMounted(() => {
  getBreadcrumb()
})


const isDashboard = (route: any): boolean => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()

}

const pathCompile = (path: any) => {
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = route
  var toPath = compile(path)
  return toPath(params)
}

const handleLink = (item: any) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }

  router.push(pathCompile(path))
}

</script>


<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
