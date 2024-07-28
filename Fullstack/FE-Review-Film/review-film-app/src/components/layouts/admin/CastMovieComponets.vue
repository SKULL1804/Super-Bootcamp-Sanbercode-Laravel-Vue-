<script setup>
import { useCastMovieStore } from "@/stores/castMovieStore";
import { useCastStore } from "@/stores/castStore";
import { useMovieStore } from "@/stores/movieStore";
import { onMounted } from "vue";
import { RouterLink } from 'vue-router';

const castMovieStore = useCastMovieStore();
const castStore = useCastStore();
const movieStore = useMovieStore();

onMounted(async () => {
    await castMovieStore.fetchCastMovie();
    await castStore.fetcCast();
    await movieStore.fetchMovie();
});

const getCastNameById = (id) => {
    const cast = castStore.casts.find(cast => cast.id === id);
    return cast ? cast.name : 'Unknown';
};

const getMovieTitleById = (id) => {
    const movie = movieStore.movies.find(movie => movie.id === id);
    return movie ? movie.title : 'Unknown';
};


onMounted(async () => {
    await castMovieStore.fetchCastMovie();
});
const deleteCastMovie = async (id) => {
    await castMovieStore.deleteCastMovie(id);
};

</script>

<template>
    <section class="p-4 pt-6">
        <div class="p-4 space-y-4">
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Cast Movie</h1>
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
                <RouterLink :to="{ name: 'createCastMovie' }" class="btn btn-primary text-white rounded-lg"
                    type="button">
                    Add Cast Movie
                </RouterLink>
            </div>
            <div class="overflow-x-auto">
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Cast</th>
                            <th>Movie</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(castMovie, index) in castMovieStore.castsMovies" :key="castMovie.id">
                            <td>{{ index + 1 }}</td>

                            <td>{{ castMovie.name }}</td>
                            <td>{{ getCastNameById(castMovie.cast_id) }}</td>
                            <td>{{ getMovieTitleById(castMovie.movie_id) }}</td>
                            <td class="space-x-2">
                                <RouterLink :to="{ name: 'detailCastMovie', params: { id: castMovie.id } }"
                                    class="btn btn-ghost btn-xs capitalize">details</RouterLink>
                                <RouterLink :to="{ name: 'editCastMovie', params: { id: castMovie.id } }"
                                    class="btn btn-primary text-white btn-xs capitalize">edit</RouterLink>
                                <button @click="deleteCastMovie(castMovie?.id)"
                                    class="btn btn-error text-white btn-xs capitalize">delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    </section>
</template>