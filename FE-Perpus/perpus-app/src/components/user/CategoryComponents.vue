<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCategoryStore } from '@/stores/categoryStore'; // Sesuaikan dengan path yang benar

const categoryStore = useCategoryStore();
const categories = ref([]);
// const activeCategory = ref('All');

onMounted(async () => {
    await categoryStore.fecthCategory();
    categories.value = categoryStore.categories;
});

// const isActiveCategory = (categoryName) => {
//     return activeCategory.value === categoryName;
// };

// const handleCategoryClick = (categoryName) => {
//     activeCategory.value = categoryName;
// };
</script>

<template>
    <div class="hidden space-x-4 mt-8 lg:flex">
        <!-- <a v-for="category in categories" :key="category.id" @click="handleCategoryClick(category.name)"
            :href="`#${category.name}`" class="btn btn-outline rounded-lg"
            :class="{ 'btn-active': isActiveCategory(category.name) }">
            <span class="transition duration-100 text-base font-bold">{{ category.name }}</span>
        </a> -->
        <div v-for="category in categoryStore.categories" :key="category.id">
            <RouterLink :to="{ name: 'book', params: { category: category.name } }" class="btn btn-outline rounded-lg">
                <span class="transition duration-100 text-base font-bold">{{ category.name }}</span>
            </RouterLink>
        </div>
    </div>
</template>
