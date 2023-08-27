<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from "@/stores/app"

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

const route = useRoute();
const appStore = useAppStore()

// You need to use storeToRefs() to extract properties from the store while keeping those properties reactive.
// https://stackoverflow.com/a/71677026
const { device, sidebar } = storeToRefs(appStore);
const { toggleDevice,closeSideBar  } = appStore;


onBeforeMount(() => {
    window.removeEventListener('resize', resizeHandler)
})

onMounted(() => {
    if (isMobile()) {
        toggleDevice('mobile')
        closeSideBar(true)
    }
})


onDeactivated(() => {
    window.removeEventListener('resize', resizeHandler)
})

watch(
    () => route.path,
    () => {
        if (device.value === 'mobile' && sidebar.value.opened) {
            closeSideBar(false)
        }
    },
    {
        immediate: true,
    }
);

const isMobile = (): boolean => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
}

const resizeHandler = () => {
    if (!document.hidden) {
        toggleDevice(isMobile() ? 'mobile' : 'desktop')

        if (isMobile()) {
            closeSideBar(true)
        }
    }
}

</script>