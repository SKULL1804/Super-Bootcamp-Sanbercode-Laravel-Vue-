<script setup>
import { useMovieStore } from '@/stores/movieStore';
import apiClient from "@/services/api";
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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

const movieStore = useMovieStore();
const genres = ref([]);
const input = reactive({
    title: "",
    year: "",
    genre_id: "",
    poster: null,
    summary: ""
});

const fetchGenre = async () => {
    const { data } = await apiClient.get("/genre");
    genres.value = data.data;
};

const handleUpload = (event) => {
    const selectPoster = event.target.files[0];
    input.poster = selectPoster;
};

const fetchMovie = async () => {
    try {
        const { data } = await apiClient.get(`/movie/${route.params.id}`);
        const movie = data.data;
        input.title = movie.title;
        input.year = movie.year;
        input.genre_id = movie.genre_id;
        input.summary = movie.summary;
    } catch (error) {
        errorMessage.value = "Failed to fetch movie details.";
    }
};

const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("year", input.year);
    formData.append("genre_id", input.genre_id);
    if (input.poster) {
        formData.append("poster", input.poster);
    }
    formData.append("summary", input.summary);

    try {
        if (props.isUpdate) {
            await movieStore.updateMovie(route.params.id, formData);
        } else {
            await movieStore.createMovie(formData);
        }
        router.push({ name: 'allMovie' });
    } catch (error) {
        console.error("Error submitting form", error);
    }
};

onMounted(() => {
    fetchGenre();
    if (props.isUpdate) {
        fetchMovie();
    }
});
</script>

<template>
    <div class="card-body">
        <div class="mb-4">
            <div class="block space-y-2 sm:space-x-0 justify-between items-center sm:flex">
                <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"> {{ props.title }} Movie
                </h1>
                <RouterLink :to="{ name: 'allMovie' }" class="btn btn-primary rounded-lg" type="button">
                    Back
                </RouterLink>
            </div>
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="grid gap-4 sm:grid-cols-6 sm:gap-6">
                <div class="sm:col-span-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Judul</span>
                        </div>
                        <input v-model="input.title" type="text" placeholder="Judul"
                            class="input input-bordered w-full" />
                    </label>
                </div>
                <div class="sm:col-span-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Tahun</span>
                        </div>
                        <input v-model="input.year" type="text" placeholder="Tahun"
                            class="input input-bordered w-full" />
                    </label>
                </div>
                <div class="sm:col-span-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Genre</span>
                        </div>
                        <select v-model="input.genre_id" class="select select-bordered">
                            <option disabled selected>Pick one</option>
                            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                                {{ genre.name }}
                            </option>
                        </select>
                    </label>
                </div>
                <div class="sm:col-span-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Poster Film</span>
                        </div>
                        <input @change="handleUpload" type="file"
                            class=" file-input file-input-bordered  file-input-primary w-full " />
                    </label>
                </div>
                <div class="col-span-full">
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Description</span>
                        </div>
                        <textarea v-model="input.summary" class="textarea textarea-bordered h-24"
                            placeholder="Description"></textarea>
                    </label>
                </div>
            </div>
            <button type="submit" class="btn mt-4 sm:mt-6 text-sm bg-primary-700 rounded-lg btn-primary">
                {{ props.isUpdate ? 'Update' : 'Add' }}
            </button>
        </form>
    </div>
</template>
