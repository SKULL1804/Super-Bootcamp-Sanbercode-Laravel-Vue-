<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },

    subTitle: {
        type:String,
        required: true,
    }
});
</script>

<template>
    <div class="flex items-center justify-center flex-col space-y-2 select-none">
        <p class="font-bold text-gray-600 text-base">
          {{ props.title }}
        </p>
        <h1 class="text-3xl lg:text-5xl font-bold">{{ props.subTitle }}</h1>
    </div>
</template>