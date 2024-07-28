<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useGenreStore } from '@/stores/genreStore';

const route = useRoute();
const genreStore = useGenreStore();
const genreId = route.params.id;
onMounted(() => {
    genreStore.detailGenre(genreId);
});

</script>

<template>
    <section class="p-4 pt-6">
        <div class="block p-4 space-y-2 sm:space-x-0 justify-between items-center sm:flex">
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"> Detail Genre {{
                genreStore.currentGenre?.name }}
            </h1>
            <RouterLink :to="{ name: 'allGenre' }" class="btn btn-primary rounded-lg" type="button">
                Back
            </RouterLink>
        </div>
        <div v-if="genreStore.currentGenre?.list_movie.length"
            class="grid grid-cols-1 xl:grid-cols-4 gap-4">
            <div v-for="movie in genreStore.currentGenre?.list_movie" :key="movie.id" class="col-span-2">
                <div class="card shadow-lg">
                    <div class="card-body">
                        <div class="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 space-y-2">
                            <div class="col-span-full sm:col-auto">
                                <figure>
                                    <img :src="movie.poster" :alt="movie.title" class="w-full h-48 object-cover" />
                                </figure>
                            </div>
                            <div class="col-span-2">
                                <div class="grid grid-cols-6 gap-2">
                                    <div class="col-span-6 sm:col-span-full">
                                        <span class="text-sm font-medium text-gray-600">Judul</span>
                                        <p class="font-bold sm:text-sm">{{ movie.title }}</p>
                                    </div>
                                    <div class="col-span-6 sm:col-span-2">
                                        <span class="text-sm font-medium text-gray-600">Year</span>
                                        <p class="font-bold sm:text-sm">{{ movie.year }}</p>
                                    </div>
                                    <div class="col-span-6 sm:col-span-2">
                                        <span class="text-sm font-medium text-gray-600">Genre</span>
                                        <p class="font-bold sm:text-sm">{{
                                            genreStore.currentGenre?.name }}</p>
                                    </div>
                                    <div class="col-span-6">
                                        <span class="text-sm font-medium text-gray-900 leading-7">Description</span>
                                        <p class="text-gray-600 sm:text-sm">{{ movie.summary.substring(0, 100) }}...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-center p-4">
            <p class="text-gray-600">Belum ada film untuk genre ini.</p>
        </div>
    </section>
</template>
