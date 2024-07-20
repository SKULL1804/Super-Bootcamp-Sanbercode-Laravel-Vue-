<script setup>
import Section from '../section/SectionComponents.vue';
import SectionTitle from '../skeleton/TitleSkeleton.vue';
</script>

<template>
    <!-- About -->
    <Section>
        <SectionTitle />
        <div class="border-8 border-gray-500 my-8 rounded-2xl">
            <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical p-6">
                <li>
                    <div class="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="timeline-start space-y-1 mb-10">
                        <div class="grid grid-cols-1 md:place-items-end">
                            <div class="skeleton w-[16vw] sm:w-24 h-6 "></div>
                        </div>
                        <div class="grid grid-cols-1 md:place-items-end">
                            <div class="skeleton w-[36vw] sm:max-lg:w-60 lg:w-60 h-6 "></div> 
                        </div>
                        <div class="skeleton w-[46vw] md:max-lg:w-80 lg:w-96 h-32"></div>
                    </div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div class="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="timeline-end space-y-1 mb-10">
                        <div class="skeleton w-[16vw] sm:w-24 h-6 "></div>
                        <div class="skeleton w-[36vw] sm:max-lg:w-60 lg:w-60 h-6 "></div> 
                        <div class="skeleton w-[46vw] md:max-lg:w-80 lg:w-96 h-32"></div>
                    </div>
                    <hr />
                </li>
            </ul>
        </div>
    </Section>
    <!-- End About -->
</template>