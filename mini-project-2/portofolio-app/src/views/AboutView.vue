<script setup>
// Components 
import About from "../components/AboutComponents.vue";
import AboutSkeleton from "../components/skeleton/AboutSkeleton.vue";

import { ref, onMounted} from 'vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000); // 
});

const abouts = [
    {
        id: 1,
        description: 'Hello! I am <span class="badge badge-outline">Aiman Abdul Hakim</span>, a recent graduate with a strong interest in web development. I excel at teamwork and am always eager to learn and take on new challenges.',
        skillDescription: 'I am proficient in <span class="badge  badge-error text-gray-50">Laravel</span>, <span class="badge badge-success text-gray-50">VueJS</span>, <span class="badge badge-info text-gray-50">Tailwind CSS</span>, and <span class="badge badge-neutral text-gray-50">Alpine.js</span>, enabling me to create responsive and user-friendly web applications. I am committed to continually improving my programming skills and making positive contributions to every project.'
    }
];

</script>

<template>
    <div>
        <!-- About -->
        <AboutSkeleton v-if="isLoading"/>
        <About :abouts="abouts" v-else />
        <!-- End About -->
    </div>
</template>