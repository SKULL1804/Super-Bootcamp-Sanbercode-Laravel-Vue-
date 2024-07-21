<script setup>
import { computed } from 'vue';
import { useThemeStore } from '@/stores/ThemeStore';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },

    subTitle: {
        type:String,
        required: true,
    }
});

const themeStore = useThemeStore();

// Perubahan warna text ketika mode Dark/Light
const textColor = computed(() => {
    return themeStore.lightMode ? 'text-gray-600' : 'text-gray-50/50';
});
</script>

<template>
    <div class="flex items-center justify-center flex-col space-y-2 select-none">
        <p :class="['font-bold text-base', textColor ]">
          {{ props.title }}
        </p>
        <h1 class="text-3xl lg:text-5xl font-bold">{{ props.subTitle }}</h1>
    </div>
</template>