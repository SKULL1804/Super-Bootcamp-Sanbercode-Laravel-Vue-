<script setup>
import { useCastStore } from "@/stores/castStore";
import { onMounted } from "vue";
import { RouterLink } from 'vue-router';

const castStore = useCastStore();

onMounted(() => {
    castStore.fetcCast();
});

const deleteCast = async (id) => {
    await castStore.deleteCast(id);
};

</script>

<template>
    <section class="p-4 pt-6">
        <div class="p-4 space-y-4">
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Cast</h1>
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
                <RouterLink :to="{ name: 'createCast' }" class="btn btn-primary text-white rounded-lg" type="button">
                    Add Cast
                </RouterLink>
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 cursor-pointer p-4">
            <article v-for="cast in castStore.casts" :key="cast.id" class="card rounded-xl shadow-lg">
                <div class="flex flex-col items-stretch p-4 sm:p-6 lg:p-8 space-y-2">
                    <h3 class="font-medium sm:text-xl">
                        {{ cast.name }}
                    </h3>

                    <p class="text-base text-gray-700">
                        {{ cast.age }}
                    </p>
                    <p class="text-sm text-gray-700">
                        {{ cast.biodata.substring(0, 250) }}
                    </p>
                    <div class="flex flex-wrap gap-2 justify-end">
                        <RouterLink :to="{ name: 'detailCast', params: { id: cast.id } }" class="btn btn-outline">
                            Detail</RouterLink>
                        <RouterLink :to="{ name: 'editCast', params: { id: cast.id } }"
                            class="btn btn-success text-white">Update</RouterLink>
                        <button @click="deleteCast(cast.id)" class="btn btn-error text-white">Delete</button>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>