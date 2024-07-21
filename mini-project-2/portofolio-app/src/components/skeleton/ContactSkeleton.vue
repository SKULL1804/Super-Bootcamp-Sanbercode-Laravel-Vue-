<script setup>
import SectionTitle from '../skeleton/TitleSkeleton.vue';
</script>

<template>
    <!-- Contact -->
    <section
        class="flex flex-col justify-center sm:items-center box-border h-[70vh] sm:h-fit pt-[4vh] mb-0 mt-0 mx-[5%]">
        <SectionTitle />

        <div class="card card-compact flex-wrap flex-row bg-base-100  border border-gray-600 my-8 rounded-3xl select-none">
            <div class="card-body sm:flex-row items-center justify-center">
                <!-- Icon -->
                <a>
                    <svg class="skeleton w-10 h-10 rounded-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                           >
                        </path>
                    </svg>
                </a>
                <!-- End Icon -->
                <p class="text-lg hidden sm:block skeleton w-40 h-8"></p>

            </div>
            <div class="card-body sm:flex-row items-center justify-center">
                <!-- Icon -->
                <a>
                    <svg class="skeleton w-10 h-10 rounded-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                           >
                        </path>
                    </svg>
                </a>
                <!-- End Icon -->
                <p class="text-lg hidden sm:block skeleton w-40 h-8"></p>

            </div>
        </div>
    </section>
    <!-- End Contact -->
</template>