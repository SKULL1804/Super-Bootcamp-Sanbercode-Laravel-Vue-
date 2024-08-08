<script setup>
import { ref, provide, computed } from "vue";
import Navbar from "@/components/user/partials/NavbarComponents.vue";
import Footer from "@/components/user/partials/FooterComponets.vue";
import Loader from '@/components/layouts/LoaderComponetns.vue'; 
import { useLoadingStore } from '@/stores/loadingStore';

const isOpen = ref(false);
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};

provide('isOpen', isOpen);
provide('toggleMenu', toggleMenu);

const loadingStore = useLoadingStore();
const isLoading = computed(() => loadingStore.isLoading);
</script>

<template>
    <Loader :isLoading="isLoading" />
    <Navbar />
    <main class="container antialiased mx-auto h-full">
        <router-view/>
    </main>
    <Footer />
</template>