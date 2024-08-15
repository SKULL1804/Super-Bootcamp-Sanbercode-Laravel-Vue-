<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/NavbarComponents.vue';
import Footer from './components/FooterComponents.vue';
import Theme from './components/ThemeComponents.vue';
import { ref, onMounted } from 'vue';
import { useThemeStore } from './stores/ThemeStore';

const isLoading = ref(true);
const themeStore = useThemeStore();

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});

themeStore.updateDOM();
</script>

<template>
  <!-- Navbar -->
  <Navbar />
  <!-- End Navbar -->

  <!-- Main -->
  <main class="container mx-auto max-w-6xl h-full transition-colors duration-500">
    <router-view v-slot="{ Component }">
      <transition
        enter-from-class="opacity-0 transform -translate-y-28 delay-300 sm-enter-from"
        enter-to-class="opacity-100 transform -translate-y-0 sm-enter-to"
        enter-active-class="transition-all duration-500 ease-out delay-300 sm-enter-active"
        
        leave-from-class="opacity-100 transform -translate-y-0 sm-leave-from"
        leave-to-class="opacity-0 transform -translate-y-28 delay-300 sm-leave-to"
        leave-active-class="transition-all duration-500 delay-300 ease-in sm-leave-active"
      >
        <component :is="Component" /> 
      </transition>
    </router-view>
  </main>
  <!-- End Main -->

  <!-- Footer -->
  <Footer />
  <!-- End Footer -->

  <!-- Button Theme -->
  <Theme/>
  <!--  -->
   
</template>

<style>
/* .app-container {
  transition: background-color 0.5s, color 0.5s;
} */

@media (min-width: 640px) {
  .sm-enter-from {
    opacity: 0;
    transform: translatex(100px);
    transition-delay: 0.3s; /* Enter delay */
  }
  .sm-enter-to {
    opacity: 1;
    transform: translatex(0);
  }
  .sm-enter-active {
    transition: all 0.5s ease-out 0.3s; /* Transition duration and enter delay */
  }

  .sm-leave-from {
    opacity: 1;
    transform: translatex(0);
  }
  .sm-leave-to {
    opacity: 0;
    transform: translatex(100px);
    transition-delay: 0.3s; /* Leave delay */
  }
  .sm-leave-active {
    transition: all 0.5s ease-in 0.3s; /* Transition duration and leave delay */
  }
}
</style>

