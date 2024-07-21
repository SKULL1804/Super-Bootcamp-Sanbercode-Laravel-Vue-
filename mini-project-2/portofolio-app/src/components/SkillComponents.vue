<script setup>
import SectionTitle from './section/TitleComponents.vue';
import Section from './section/SectionComponents.vue';
import { computed } from "vue";
import { useThemeStore } from "@/stores/ThemeStore";

const props = defineProps({
    skillBackend: {
        type: Array,
        required: true,
    },
    skillFrontend: {
        type: Array,
        required: true,
    }
});

const themeStore = useThemeStore();

// Perubahan warna text ketika mode Dark/Light
const textColor =  computed(() => {
    return themeStore.lightMode ? 'text-gray-600' : 'text-gray-50';
})
// Perubahan warna border ketika mode Dark/Light
const borderColor =  computed(() => {
    return themeStore.lightMode ? 'border-gray-600 ' : 'border-gray-50/50';
})

</script>

<template>
    <!-- Skill -->
    <Section>
        <SectionTitle title="Explore My" subTitle="Skills" />

        <div class="flex flex-col gap-10 my-8 justify-center sm:items-stretch text-center sm:max-xl:flex-row xl:flex-row select-none">
            <div class="basis-1/2 flex flex-col border border-gray-600 dark:border-gray-100 p-6 rounded-3xl">
                <!-- Backend -->
                <div :class="['border-b-4', borderColor]">
                    <h2 :class="['font-bold text-lg sm:text-2xl mb-2', textColor]">Backend Development</h2>
                </div>

                <div class="grid grid-cols-2 my-8 gap-4">
                    <span v-for="backend in props.skillBackend" :key="backend.id" :class="backend.style">
                        <svg class="size-8 hidden lg:max-xl:block xl:block fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"  >
                            <path :d="backend.icon" />
                        </svg>
                        {{ backend.name }}
                    </span>
                </div>
                <!-- End Beckend -->
            </div>

            <div class="basis-1/2 flex flex-col border border-gray-600 dark:border-gray-100 p-6 rounded-3xl">
                <!-- Frontend -->
                <div :class="['border-b-4', borderColor]">
                    <h2 :class="['font-bold text-lg sm:text-2xl mb-2', textColor]">Fronted Development</h2>
                </div>

                <div class="grid grid-cols-2 my-8 gap-4">
                    <span v-for="fronted in props.skillFrontend" :key="fronted.id" :class="fronted.style">
                        <svg class="size-8 hidden lg:max-xl:block xl:block fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path :d="fronted.icon"></path>
                        </svg>
                        {{ fronted.name }}
                    </span>
                </div>
                <!-- End Fronted -->
            </div>
        </div>
    </Section>
    <!-- End Skill -->
</template>