import { acceptHMRUpdate, defineStore } from "pinia";
import defaultSettings from "@/settings";

const {
  fixedHeader,
  sidebarLogo,
} = defaultSettings;

export const useSettingsStore = defineStore("settings", {
  state: () => {
    return {
      fixedHeader,
      sidebarLogo,
    };
  },
  getters: {},
  actions: {
    changeSetting(data: { [key: string]: any }) {
      switch (data.key) {
        case "fixedHeader":
          this.fixedHeader = data.value
          break;
        case "sidebarLogo":
          this.sidebarLogo = data.value
          break;
        default:
          break;
      }
    },
  },
});

// 确保传递正确的 store 声明，本例中为 `useSettingsStore`
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
}
