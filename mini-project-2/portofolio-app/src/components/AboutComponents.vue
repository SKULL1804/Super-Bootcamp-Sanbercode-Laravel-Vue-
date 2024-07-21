<script setup>
import About from '../assets/img/me2.jpg'
import SectionTitle from './section/TitleComponents.vue';
import Section from './section/SectionComponents.vue';
import { computed } from 'vue';
import { useThemeStore } from '../stores/ThemeStore';

const props = defineProps({
    abouts: {
        type: Array,
        required: true,
    }
})
const themeStore = useThemeStore();

const shadowColor = computed(() => {
    return themeStore.lightMode ? 'shadow-gray-900/50' : 'shadow-gray-300/25';
});

</script>

<template>
    <!-- About -->
    <Section>
        <SectionTitle title="Get To Know More" subTitle="About Me" />
        <div class="flex flex-col justify-center items-center select-none xl:gap-16 xl:flex-row">
            <img :src="About"
                :class="['mt-4 mb-8 mx-auto xl:my-10 w-auto h-[46vw] sm:w-[275px] sm:h-[275px] xl:w-96 xl:h-96  rounded-3xl shadow-2xl', shadowColor]" />
            <div v-for="about in props.abouts" :key="about.id"
                class="flex justify-center items-center flex-col space-y-4">
                <p class="font-medium tracking-wide" v-html="about.description"></p>
                <p class="font-medium tracking-wide" v-html="about.skillDescription"></p>
            </div>
        </div>
    </Section>
    <!-- End About -->
</template>