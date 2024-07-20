<script setup>
import Section from '../section/SectionComponents.vue';
import SectionTitle from '../skeleton/TitleSkeleton.vue';
</script>
<template>
    <!-- About -->
    <Section>
        <SectionTitle/>
        <div class="flex flex-col justify-center items-center select-none xl:gap-16 xl:flex-row">
            <div
                class="skeleton mt-4 mb-8 mx-auto xl:my-10 w-[46vw] h-[46vw] sm:w-[275px] sm:h-[275px] xl:w-96 xl:h-96 rounded-3xl shadow-2xl" />
            <div
                class="flex justify-center items-center flex-col space-y-4">
                <p class="skeleton w-[76vw] sm:max-xl:w-[600px] xl:w-[600px] h-24"></p>
                <p class="skeleton w-[76vw] sm:max-xl:w-[600px] xl:w-[600px] h-32"></p>
            </div>  
        </div>
    </Section>
    <!-- End About -->
</template>