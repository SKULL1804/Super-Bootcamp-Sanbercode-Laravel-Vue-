<script setup>
import Sidebar from '@/components/layouts/admin/partials/SidebarComponents.vue';
import Header from '@/components/layouts/admin/partials/HeaderComponent.vue';
import { ref, provide } from "vue";

const isOpen = ref(false);
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};

provide('isOpen', isOpen);
provide('toggleMenu', toggleMenu);

</script>

<template>
   <div>
      <Header />
      <div class="flex pt-16 overflow-hidden ">
         <Sidebar />
         <main class="relative w-full h-full lg:ml-64">
            <router-view></router-view>
         </main>
      </div>
   </div>
</template>