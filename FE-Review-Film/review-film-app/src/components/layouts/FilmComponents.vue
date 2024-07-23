<script setup>
const props = defineProps({
    movies: {
        type: Array,
        required: true
    }
})

</script>

<template>
    <div v-for="movie in props.movies" :key="movie.id" class="card card-side bg-base-100 shadow-xl">
        <figure class="min-w-24 w-24 h-36 lg:w-36 lg:h-40">
            <img class="w-full h-full object-cover" :src="movie.img" :alt="movie.name" />
        </figure>
        <div class="flex flex-col p-4 items-baseline justify-center">
            <h2 class="card-title">{{ movie.name }}</h2>
            <p class="line-clamp-4 text-sm lg:text-base">{{ movie.description }}</p>
        </div>
    </div>
   
</template>
