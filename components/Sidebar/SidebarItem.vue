<template>
  <div v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow"
    >
      <sidebar-link v-if="onlyOneChild.meta && onlyOneChild.meta.sidebar" :to="resolvePath(onlyOneChild)">
        <el-tooltip v-if="collapse&&!isNest" :content="onlyOneChild.meta.title" placement="right">
          <el-menu-item :index="resolvePath(onlyOneChild)" :class="{ 'submenu-title-noDropdown': !isNest }">
            <sidebar-meta-item
              :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
              :title="t('route.' + onlyOneChild.meta.title)"
            />
          </el-menu-item>
        </el-tooltip>
        <el-menu-item v-else :index="resolvePath(onlyOneChild)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <sidebar-meta-item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="t('route.' + onlyOneChild.meta.title)"
          />
        </el-menu-item>
      </sidebar-link>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item)" teleported>
      <template #title>
        <sidebar-meta-item
          v-if="item.meta && item.meta.sidebar"
          :icon="item.meta && item.meta.icon"
          :title="t('route.' + item.meta.title)"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :collapse="collapse"
        :base-path="resolvePath(child)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import path from 'path-browserify'
import { useAppStore } from '@/stores/app'
import { isExternal } from '@/utils/validate'

const {
  t
} = useI18n()

const props = defineProps({
  // route object
  collapse: {
    type: Boolean,
    required: true
  },
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  // In order to fix the click on menu on the ios device will trigger the mouseleave bug
  // https://github.com/PanJiaChen/vue-element-admin/issues/1135
  fixBugIniOS()
})

const appStore = useAppStore()

// You need to use storeToRefs() to extract properties from the store while keeping those properties reactive.
// https://stackoverflow.com/a/71677026
const { device } = storeToRefs(appStore)

// To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
// TODO: refactor with render function
const onlyOneChild = ref()
const subMenu = ref()

const hasOneShowingChild = function (children = [], parent: any) {
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false
    } else if (!item.meta || !item.meta.sidebar) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

const resolvePath = function (route: any) {
  // console.log(route)
  // console.log(route.path)
  // console.log(route.meta)
  let routePath: string

  if (route.meta && route.meta.link) {
    routePath = route.meta.link
  } else {
    routePath = route.path
  }

  if (isExternal(routePath)) {
    return routePath
  }

  if (isExternal(props.basePath)) {
    return props.basePath
  }

  return path.resolve(props.basePath, routePath)
}

const fixBugIniOS = function () {
  if (subMenu.value) {
    const handleMouseleave = subMenu.value.handleMouseleave
    subMenu.value.handleMouseleave = (e: any) => {
      if (device.value === 'mobile') {
        return
      }
      handleMouseleave(e)
    }
  }
}
</script>
