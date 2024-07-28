<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCastMovieStore } from '@/stores/castMovieStore';

const route = useRoute();
const castMovieStore = useCastMovieStore();
const castMovieId = route.params.id;
onMounted(() => {
    castMovieStore.detailCastMovie(castMovieId);
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
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Detail Cast
                                Movie
                            </h1>
                            <RouterLink :to="{ name: 'allCastMovie' }" class="btn btn-primary rounded-lg" type="button">
                                Back
                            </RouterLink>
                        </div>
                    </div>
                    <div v-if="castMovieStore.currentCastMovie" class="grid grid-cols-1 space-y-2">
                        <div class="col-span-full">
                            <h1 class="text-xl font-bold">{{ castMovieStore.currentCastMovie.name }}</h1>
                            <p class="text-base text-gray-700">Cast Name: {{ castMovieStore.currentCastMovie.cast.name }}</p>
                            <p class="text-base text-gray-700">Movie Title: {{ castMovieStore.currentCastMovie.movie.title }}</p>
                            <p class="text-base text-gray-700">Summary: {{ castMovieStore.currentCastMovie.movie.summary }}</p>
                            <img :src="castMovieStore.currentCastMovie.movie.poster" alt="Movie Poster" class="w-64 h-auto mt-2"/>
                            <p class="text-base text-gray-700">Year: {{ castMovieStore.currentCastMovie.movie.year }}</p>
                        </div>
                        <div class="col-span-full">
                            <h1 class="text-base text-gray-700">Cast Age: {{ castMovieStore.currentCastMovie.cast.age }}</h1>
                            <p class="text-base text-gray-700">Bio: {{ castMovieStore.currentCastMovie.cast.biodata }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
