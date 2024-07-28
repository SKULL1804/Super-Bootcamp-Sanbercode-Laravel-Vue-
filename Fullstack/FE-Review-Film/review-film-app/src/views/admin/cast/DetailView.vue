<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCastStore } from '@/stores/castStore';

const route = useRoute();
const castStore = useCastStore();
const castId = route.params.id; 

onMounted(() => {
    castStore.detailCast(castId);
});
</script>

<template>
    <section class="p-4 pt-6">
        <div class="p-4 card shadow-lg sm:flex items-center justify-between lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div class="w-full mb-1">
                <div class="card-body">
                    <div class="mb-4">
                        <div class="block space-y-2 sm:space-x-0 justify-between items-center sm:flex">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Detail Cast</h1>
                            <RouterLink :to="{ name: 'allCast' }" class="btn btn-primary rounded-lg" type="button">
                                Back
                            </RouterLink>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 space-y-2">
                        <div class="col-span-full">
                            <h1 class="text-xl font-bold">{{ castStore.currentCast?.name }}</h1>
                            <p class="text-base text-gray-700">Age: {{ castStore.currentCast?.age }}</p>
                        </div>
                        <div class="col-span-full">
                            <h2 class="text-lg font-semibold">Bio:</h2>
                            <p class="text-base text-gray-700">{{ castStore.currentCast?.biodata }}</p>
                        </div>
                        <div class="col-span-full">
                            <h2 class="text-lg font-semibold">Movies:</h2>
                            <ul>
                                <li v-for="movie in castStore.currentCast?.list_movie" :key="movie.id">
                                    <div class="mb-2">
                                        <h3 class="font-semibold">{{ movie?.title }}</h3>
                                        <p>{{ movie.summary }}</p>
                                        <img :src="movie.poster" :alt="`Poster for ${movie.title}`" class="w-32 h-auto mt-2">
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
