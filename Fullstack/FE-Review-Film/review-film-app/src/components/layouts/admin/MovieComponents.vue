<script setup>
import { onMounted } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import { RouterLink } from 'vue-router';

const movieStore = useMovieStore();

onMounted(() => {
    movieStore.fetchMovie();
});

const deleteMovie = async (id) => {
    await movieStore.deleteMovie(id);
};
</script>

<template>
    <section class="p-4 pt-6">
        <div class="p-4 card shadow-lg sm:flex items-center justify-between lg:mt-1.5 dark:bg-gray-800">
            <div class="w-full mb-1">
                <div class="card-body">
                    <div class="mb-4">
                        <div class="flex justify-between items-center">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Movies</h1>
                        </div>
                    </div>
                    <div class="items-center justify-between block sm:flex">
                        <div class="flex items-center mb-4 sm:mb-0">
                            <form class="sm:pr-3" action="#" method="GET">
                                <label class="input input-bordered flex items-center gap-2">
                                    <input type="text" class="grow" placeholder="Search" />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        class="h-4 w-4 opacity-70">
                                        <path fill-rule="evenodd"
                                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </label>
                            </form>
                        </div>
                        <RouterLink :to="{ name: 'createMovie' }" class="btn btn-primary text-white rounded-lg"
                            type="button">
                            Add Movie
                        </RouterLink>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 cursor-pointer mt-4">
                        <div v-for="movie in movieStore.movies" :key="movie.id"
                            class="card card-side bg-base-100 shadow-xl">
                            <figure class="min-w-24 w-24 lg:w-36">
                                <img class="w-full h-full object-cover" :src="movie.poster" :alt="movie.title" />
                            </figure>
                            <div class="flex flex-col p-4 items-stretch justify-center">
                                <h2 class="card-title">{{ movie.title }}</h2>
                                <p class="line-clamp-4 text-sm lg:text-base">{{ movie.summary.substring(0, 150) }}...</p>
                                <div class="card-actions justify-end">
                                    <RouterLink :to="{ name: 'detailMovie', params: { id: movie.id } }" class="btn btn-ghost">Detail</RouterLink>
                                    <RouterLink :to="{ name: 'editMovie', params: { id: movie.id } }" class="btn btn-success text-white">Update</RouterLink>
                                    <button @click="deleteMovie(movie.id)" class="btn btn-error text-white">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
