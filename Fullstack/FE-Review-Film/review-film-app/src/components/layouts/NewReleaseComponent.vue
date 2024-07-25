<script setup>
const props = defineProps({
    newReleases: {
        type: Array,
        required: true,
    }
})
</script>

<template>
    <section class="box-border h-fit pt-[4vh] mb-0 mt-0 mx-[5%] space-y-2">
        <div class="flex items-start justify-start select-none">
            <h1 class="text-3xl lg:text-5xl font-bold">New Release</h1>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-4 ">
            <div v-for="newRelease in props.newReleases" :key="newRelease.id" class="card card-side bg-base-100 max-w-96 shadow-xl">
                <figure class="min-w-24 w-24 h-36 lg:w-36 lg:h-40">
                    <img class="w-full h-full object-cover" :src="newRelease.img" :alt="newRelease.name" />
                </figure>
                <div class="lex flex-col p-4 items-baseline justify-center">
                    <h2 class="card-title">{{ newRelease.name }}</h2>
                    <p class="line-clamp-4 text-sm lg:text-base">{{ newRelease.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>