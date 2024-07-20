<script setup>
import SectionTitle from './section/TitleComponents.vue';
import Section from './section/SectionComponents.vue';

const props = defineProps({
    experiences: {
        type: Array,
        required: true,
    },
});

</script>

<template>
    <!-- Experience -->
    <Section>
        <SectionTitle title="Explore My" subTitle="Experience" />

        <div class="border-8 border-gray-500 my-8 rounded-2xl">
            <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical p-6">
                <li v-for="experience in props.experiences" :key="experience.id">
                    <div class="timeline-middle">
                        <!-- Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                            <path fill-rule="evenodd" :d="experience.icon" clip-rule="evenodd" />
                        </svg>
                        <!-- End Icon -->
                    </div>
                    <div :class="experience.style">
                        <time class="font-mono italic">{{ experience.tahun }}</time>
                        <div class="text-lg font-black">{{ experience.tempat }}</div>
                        <p v-html="experience.description"></p>
                    </div>
                    <hr />
                </li>
            </ul>
        </div>
    </Section>
    <!-- End Experience -->
</template>