<script setup>
import CastMovieForm from '@/components/layouts/admin/partials/CastMovieFormComponents.vue';
</script>

<template>
    <section class="p-4 pt-6">
        <div
            class="p-4 card shadow-lg sm:flex items-center justify-between lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div class="w-full mb-1">
                <CastMovieForm title="Create" />
            </div>
        </div>
    </section>
</template>