import { acceptHMRUpdate, defineStore } from "pinia";
import Cookies from "js-cookie";

export const useAppStore = defineStore("apps", {

  state: () => {
    return {
      sidebar: {
        opened: !(Cookies.get("sidebarStatus") === "0"),
        withoutAnimation: false,
      },
      device: "desktop",
    };
  },
  getters: {
  },
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        Cookies.set("sidebarStatus", "1");
      } else {
        Cookies.set("sidebarStatus", "0");
      }
    },
    closeSideBar(withoutAnimation: boolean) {
      Cookies.set("sidebarStatus", "0");
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device: string) {
      this.device = device;
    }
  },
});

// 确保传递正确的 store 声明，本例中为 `useAppStore`
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
