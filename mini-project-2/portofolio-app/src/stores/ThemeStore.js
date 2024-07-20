import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: false,
  }),
  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode;
      this.updateDOM();
    },
    setDarkMode(value) {
      this.darkMode = value;
      this.updateDOM();
    },
    updateDOM() {
      if (this.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dracula');
      } else {
        document.documentElement.setAttribute('data-theme', 'pastel');
      }
    }
  },
});
