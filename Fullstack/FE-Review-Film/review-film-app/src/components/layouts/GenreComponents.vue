<script setup>
const props = defineProps({
    movies: {
        type: Array,
        required: true,
    },
})
</script>

<template>
    <section class="h-fit pt-[4vh] mb-0 mt-0 mx-[5%] space-y-2">
        <div class="flex items-start justify-start select-none">
            <h1 class="text-3xl lg:text-5xl font-bold capitalize">{{ genreName }}</h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div v-for="movie in props.movies" :key="movie.id" class="card card-side bg-base-100 shadow-xl">
                <figure class="min-w-24 w-24 h-36 lg:w-36 lg:h-40">
                    <img class="w-full h-full object-cover" :src="movie.img" :alt="movie.name" />
                </figure>
                <div class="flex flex-col p-4 items-baseline justify-center">
                    <h2 class="card-title">{{ movie.name }}</h2>
                    <p class="text-sm lg:text-base">{{ movie.genre }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
