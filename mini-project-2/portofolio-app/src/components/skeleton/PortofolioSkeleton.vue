<script setup>
import Section from '../section/SectionComponents.vue';
import SectionTitle from '../skeleton/TitleSkeleton.vue';
</script>

<template>
     <!-- Portofolio -->
     <Section>
        <SectionTitle/>
        <div class="flex gap-8 flex-wrap justify-center my-8">
            <div
                class="card w-auto lg:w-96 shadow-xl border border-gray-600 ">
                <figure class="px-6 pt-6 sm:px-10 sm:pt-10">
                    <img class="skeleton w-[76vw] h-[32vw] sm:w-72 sm:h-32 rounded-xl " />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="skeleton w-32 h-8"></h2>
                    <p class="skeleton w-[46vw] h-[12vw] sm:w-60 sm:h-20"></p>
                    <div class="card-actions">
                        <a class="skeleton h-11 w-20"></a>
                    </div>  
                </div>
            </div>
        </div>
    </Section>
    <!-- End Portofolio -->
</template>