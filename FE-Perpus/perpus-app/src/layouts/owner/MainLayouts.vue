<script setup>
import { ref, provide } from "vue";
import Sidebar from '@/components/owner/partials/SidebarComponents.vue';
import Navbar from '@/components/owner/partials/HeaderComponents.vue';

const isOpen = ref(false);
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};

provide('isOpen', isOpen);
provide('toggleMenu', toggleMenu);
</script>

<template>
    <div class="drawer xl:drawer-open">
        <input type="checkbox" class="drawer-toggle" v-model="isOpen" />
        <Sidebar />
        <main class="drawer-content mx-4 flex flex-col">
            <Navbar />
            <router-view></router-view>
        </main>
    </div>
</template>
    