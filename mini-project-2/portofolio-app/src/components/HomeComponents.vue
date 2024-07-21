<script setup>
import Me from '../assets/img/me.jpeg';
import CV from '../assets/file/CV-Aiman.pdf';
import { computed } from 'vue';
import { useThemeStore } from '../stores/ThemeStore';

const props = defineProps({
    sosmeds: {
        type: Array,
        required: true,
    },
});
const themeStore = useThemeStore();

// Perubahan warna text ketika mode Dark/Light
const textColor = computed(() => {
    return themeStore.lightMode ? 'text-gray-600' : 'text-gray-50/50';
});

const shadowColor = computed(() => {
    return themeStore.lightMode ? 'shadow-gray-900/50' : 'shadow-gray-300/25';
});

</script>

<template>
    <!-- Hero -->
    <section class="box-border min-h-[90vh] sm:h-[83vh] pt-[4vh] mb-0 mt-0 mx-[5%] sm:mb-24 xl:mx-40">
        <div class="flex items-center justify-center flex-col xl:gap-20 xl:flex-row">
            <img :src="Me"
                :class="['mb-8 mx-auto xl:my-10 w-auto h-[46vw] sm:w-[275px] sm:h-[275px] xl:w-96 xl:h-96 rounded-full shadow-2xl', shadowColor]" />
            <div class="flex flex-col text-center self-center select-none space-y-4">
                <div :class="['font-medium text-xl', textColor]">
                    Hello, I'm
                </div>
                <h1 class="text-3xl sm:text-5xl font-bold">Aiman Abdul Hakim</h1>
                <p :class="['text-2xl sm:text-3xl font-semibold mb-4', textColor]">
                    FullStack Developer
                </p>
                <div class="flex items-center justify-center">
                    <a :href="CV" target="_blank" download class="btn btn-outline">Download CV</a>
                </div>
                <div class="flex items-center justify-center gap-4 mt-4">
                    <div v-for="sosmed in props.sosmeds" :key="sosmed.id">
                        <a :href="sosmed.linkSosmed" target="_blank" v-html="sosmed.iconSosmed"></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Hero -->
</template>
