import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    lightMode: false,
  }),
  actions: {
    toggleTheme() {
      this.lightMode = !this.lightMode;
      this.updateDOM();
    },
    setLightMode(value) {
      this.lightMode = value;
      this.updateDOM();
    },
    // applyThemeWithDelay() {
    //   // Delay sebelum memperbarui DOM
    //   setTimeout(() => {
    //     this.updateDOM();
    //   }, 100); // Delay 100ms, sesuaikan sesuai kebutuhan
    // },
    updateDOM() {
      if (this.lightMode) {
        document.documentElement.setAttribute('data-theme', 'pastel');
      } else {
        document.documentElement.setAttribute('data-theme', 'dracula');
      }
    }
  },
});
