<script setup>
import { useCastMovieStore } from '@/stores/castMovieStore';
import { reactive, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/services/api'; // Ensure apiClient is imported

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    isUpdate: {
        type: Boolean,
        default: false
    },
});

const route = useRoute();
const router = useRouter();
const castMovieStore = useCastMovieStore();

const casts = ref([]);
const movies = ref([]);
const input = reactive({
    name: "",
    cast_id: "",
    movie_id: "",
});

const fetchCast = async () => {
    try {
        const { data } = await apiClient.get("/cast");
        casts.value = data.data;
    } catch (error) {
        console.error("Failed to fetch casts", error);
    }
};

const fetchMovie = async () => {
    try {
        const { data } = await apiClient.get("/movie");
        movies.value = data.data;
    } catch (error) {
        console.error("Failed to fetch movies", error);
    }
};

const fetchCastMovieDetails = async () => {
    if (props.isUpdate) {
        try {
            await castMovieStore.detailCastMovie(route.params.id);
            const castMovie = castMovieStore.currentCastMovie;
            input.name = castMovie.name;
            input.cast_id = castMovie.cast_id;
            input.movie_id = castMovie.movie_id;
        } catch (error) {
            console.error("Failed to fetch cast movie details", error);
        }
    }
};

const handleSubmit = async () => {
    const formData = {
        name: input.name,
        cast_id: input.cast_id,
        movie_id: input.movie_id
    };

    try {
        if (props.isUpdate) {
            await castMovieStore.updateCastMovie(route.params.id, formData);
        } else {
            await castMovieStore.createCastMovie(formData);
        }
        router.push({ name: 'allCastMovie' });
    } catch (error) {
        console.error("Error submitting form", error);
    }
};

onMounted(() => {
    fetchCast();
    fetchMovie();
    fetchCastMovieDetails();
});
</script>

<template>
    <div class="card-body">
        <div class="mb-4">
            <div class="block space-y-2 sm:space-x-0 justify-between items-center sm:flex">
                <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"> {{ props.title }} Cast Movie
                </h1>
                <RouterLink :to="{ name: 'allCastMovie' }" class="btn btn-primary rounded-lg" type="button">
                    Back
                </RouterLink>
            </div>
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="grid gap-4 sm:gap-6">
                <div class="col-span-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Name</span>
                        </div>
                        <input v-model="input.name" type="text" placeholder="Name" class="input input-bordered w-full" />
                    </label>
                </div>
                <div class="col-span-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Cast</span>
                        </div>
                        <select v-model="input.cast_id" class="select select-bordered">
                            <option disabled value="">Pilih Cast</option>
                            <option v-for="cast in casts" :key="cast.id" :value="cast.id">
                                {{ cast.name }}
                            </option>
                        </select>
                    </label>
                </div>
                <div class="col-span-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Movie</span>
                        </div>
                        <select v-model="input.movie_id" class="select select-bordered">
                            <option disabled value="">Pilih Movie</option>
                            <option v-for="movie in movies" :key="movie.id" :value="movie.id">
                                {{ movie.title }}
                            </option>
                        </select>
                    </label>
                </div>
            </div>
            <button type="submit" class="btn mt-4 sm:mt-6 text-sm bg-primary-700 rounded-lg btn-primary">
                {{ props.isUpdate ? 'Update' : 'Add' }} Cast Movie
            </button>
        </form>
    </div>
</template>
