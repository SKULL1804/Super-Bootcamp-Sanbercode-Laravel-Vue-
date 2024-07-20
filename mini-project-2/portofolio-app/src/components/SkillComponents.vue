<script setup>
import SectionTitle from './section/TitleComponents.vue';

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

</script>

<template>
    <!-- Skill -->
    <section class="box-border h-fit pt-[4vh] mb-0 mt-8 mx-[5%] xl:mt-0">
        <SectionTitle title="Explore My" subTitle="Skills" />

        <div class="flex flex-col gap-10 my-8 justify-center sm:items-stretch text-center sm:max-xl:flex-row xl:flex-row">
            <div class="basis-1/2 flex flex-col border border-gray-600 dark:border-gray-100 p-6 rounded-3xl">
                <!-- Backend -->
                <div class="border-b-4 border-gray-600 ">
                    <h2 class="font-bold text-lg sm:text-2xl mb-2">Backend Development</h2>
                </div>

                <div class="grid grid-cols-2 my-8 gap-4">
                    <span v-for="backend in props.skillBackend" :key="backend.id" :class="backend.style">
                        <svg class="h-8 w-8 hidden sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path :d="backend.icon" />
                        </svg>
                        {{ backend.name }}
                    </span>
                </div>
                <!-- End Beckend -->
            </div>

            <div class="basis-1/2 flex flex-col border border-gray-600 dark:border-gray-100 p-6 rounded-3xl">
                <!-- Frontend -->
                <div class="border-b-4 border-gray-600">
                    <h2 class="font-bold text-lg sm:text-2xl mb-2">Fronted Development</h2>
                </div>

                <div class="grid grid-cols-2 my-8 gap-4">
                    <span v-for="fronted in props.skillFrontend" :key="fronted.id" :class="fronted.style">
                        <svg class="hidden sm:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path :d="fronted.icon"></path>
                        </svg>
                        {{ fronted.name }}
                    </span>
                </div>
                <!-- End Fronted -->
            </div>
        </div>
    </section>
    <!-- End Skill -->
</template>