<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// You need to use storeToRefs() to extract properties from the store while keeping those properties reactive.
// https://stackoverflow.com/a/71677026
const { device } = storeToRefs(appStore);

onMounted(() => {
  // In order to fix the click on menu on the ios device will trigger the mouseleave bug
  // https://github.com/PanJiaChen/vue-element-admin/issues/1135
  fixBugIniOS()
})

const fixBugIniOS = function () {
  const $subMenu:any = undefined;//this.$refs.subMenu
  if ($subMenu) {
    const handleMouseleave = $subMenu.handleMouseleave
    $subMenu.handleMouseleave = (e:any) => {
      if (device.value === 'mobile') {
        return
      }
      handleMouseleave(e)
    }
  }
}
</script>