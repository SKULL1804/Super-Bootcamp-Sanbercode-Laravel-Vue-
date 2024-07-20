<script setup>
import SectionTitle from '../skeleton/TitleSkeleton.vue';
</script>

<template>
    <!-- Skill -->
    <section class="box-border h-fit pt-[4vh] mb-0 mt-8 mx-[5%] xl:mt-0">
        <SectionTitle/>

        <div class="flex flex-col gap-10 my-8 justify-center sm:items-stretch text-center sm:flex-row ">
            <div class="basis-1/2 flex flex-col border border-gray-600 p-6 rounded-3xl">
                <!-- Backend -->
                <div class="skeleton w-[40vw] sm:w-72 h-10 mx-auto"></div>

                <div class="grid grid-cols-2 my-8 gap-4">
                    <span class="skeleton w-full h-12"></span>
                    <span class="skeleton w-full h-12"></span>
                    <span class="skeleton w-full h-12"></span>
                    <span class="skeleton w-full h-12"></span>
                </div>
                <!-- End Beckend -->
            </div>

            <div class="basis-1/2 flex flex-col border border-gray-600 p-6 rounded-3xl">
                <!-- Frontend -->
                <h2 class="skeleton w-[40vw] sm:w-72 h-10 mx-auto"></h2>

                <div class="grid grid-cols-2 my-8 gap-4">
                    <span class="skeleton w-full h-12"></span>
                    <span class="skeleton w-full h-12"></span>
                    <span class="skeleton w-full h-12"></span>
                    <span class="skeleton w-full h-12"></span>
                    <span class="skeleton w-full h-12 col-span-2"></span>
                </div>
                <!-- End Fronted -->
            </div>
        </div>
    </section>
    <!-- End Skill -->
</template>