<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';

const route = useRoute();
const movieStore = useMovieStore();
const movieId = route.params.id;
onMounted(() => {
    movieStore.detailMovie(movieId);
});

</script>

<template>
    <section class="p-4 pt-6">
        <div
            class="p-4 card shadow-lg sm:flex items-center justify-between lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div class="w-full mb-1">
                <div class="card-body">
                    <div class="mb-4">
                        <div class="block space-y-2 sm:space-x-0 justify-between items-center sm:flex">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"> Detail Movie
                            </h1>
                            <RouterLink :to="{ name: 'allMovie' }" class="btn btn-primary rounded-lg" type="button">
                                Back
                            </RouterLink>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 space-y-2">
                        <div class="col-span-full sm:col-auto">
                            <figure>
                                <img class="w-60 h-full object-cover rounded-md" :src="movieStore.currentMovie?.poster"
                                    :alt="movieStore.currentMovie?.title" />
                            </figure>
                        </div>
                        <div class="col-span-2 space-y-2">
                            <div class="grid grid-cols-6 gap-2">
                                <div class="col-span-6 sm:col-span-2">
                                    <span class="text-sm font-medium text-gray-600">Judul</span>
                                    <p class="font-bold sm:text-sm">{{ movieStore.currentMovie?.title }}</p>
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <span class="text-sm font-medium text-gray-600">Year</span>
                                    <p class="font-bold sm:text-sm">{{ movieStore.currentMovie?.year }}</p>
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <span class="text-sm font-medium text-gray-600">Genre</span>
                                    <p class="font-bold sm:text-sm">{{ movieStore.currentMovie?.genre.name }}</p>
                                </div>
                                <div class="col-span-6">
                                    <span class="text-sm font-medium text-gray-900 leading-7">Description</span>
                                    <p class="text-gray-600 sm:text-sm">{{ movieStore.currentMovie?.summary }}</p>
                                </div>
                            </div>
                            <div v-if="movieStore.currentMovie?.list_cast && movieStore.currentMovie.list_cast.length"
                                class="grid grid-cols-1 gap-2">
                                <div v-for="cast in movieStore.currentMovie.list_cast" :key="cast.id">
                                    <div class="col-span-6 sm:col-span-2">
                                        <span class="text-sm font-medium text-gray-600">Nama</span>
                                        <p class="font-bold sm:text-sm">{{ cast.name }}</p>
                                    </div>
                                    <div class="col-span-6 sm:col-span-2">
                                        <span class="text-sm font-medium text-gray-600">Age</span>
                                        <p class="font-bold sm:text-sm"> {{ cast.age }}</p>
                                    </div>
                                    <div class="col-span-6 sm:col-span-2">
                                        <span class="text-sm font-medium text-gray-600">Biodata</span>
                                        <p class="font-bold sm:text-sm">{{ cast.biodata }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
