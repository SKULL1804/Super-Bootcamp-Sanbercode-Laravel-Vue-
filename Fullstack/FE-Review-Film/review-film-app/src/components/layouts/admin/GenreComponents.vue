<script setup>
import { ref, onMounted } from 'vue';
import { useGenreStore } from '@/stores/genreStore';
import Genre from './partials/GenreFormComponents.vue';
import { RouterLink } from 'vue-router';

const genreStore = useGenreStore();

const showModal = ref(false);
const isEdit = ref(false);
const currentGenre = ref({});

const toggleModal = () => {
    showModal.value = !showModal.value;
    if (!showModal.value) {
        currentGenre.value = {};
    }
};

const addGenre = () => {
    isEdit.value = false;
    toggleModal();
};

const editGenre = (genre) => {
    currentGenre.value = genre;
    isEdit.value = true;
    toggleModal();
};

const handleSubmit = async (input) => {
    if (isEdit.value) {
        await genreStore.updateGenre(currentGenre.value.id, input);
    } else {
        await genreStore.createGenre(input);
    }
    if (genreStore.success) {
        toggleModal();
    }
};

const deleteGenre = async (id) => {
    try {
        await genreStore.deleteGenre(id);
    } catch (error) {
        console.error("Error deleting genre:", error);
    }
};

onMounted(() => {
    genreStore.fecthGenre();
});
</script>

<template>
    <section class="p-4 pt-6">
        <div
            class="p-4 card shadow-lg sm:flex items-center justify-between lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div class="w-full mb-1">
                <div class="card-body">
                    <div class="mb-4">
                        <div class="flex justify-between items-center">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Genre</h1>
                            <div v-if="genreStore.success" class="alert alert-success w-40">
                                <span class="text-white">{{ genreStore.success }}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
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
                        <button @click="addGenre" class="btn btn-primary text-white rounded-lg" type="button">
                            Add Genre
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="table table-zebra">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(genre, index) in genreStore.genres" :key="genre.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ genre.name }}</td>
                                    <td class="space-x-2">
                                        <RouterLink :to="{ name: 'detailGenre', params: { id: genre.id } }" class="btn btn-ghost btn-xs capitalize">details</RouterLink>
                                        <button @click="editGenre(genre)"
                                            class="btn btn-primary text-white btn-xs capitalize">edit</button>
                                        <button @click="deleteGenre(genre.id)" href="#"
                                            class="btn btn-error text-white btn-xs capitalize">delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <Genre :showModal="showModal" :genre="currentGenre" :errors="genreStore.errors" :isEdit="isEdit"
            :toggleModal="toggleModal" :handleSubmit="handleSubmit" />
    </section>
</template>