<script setup>
import { onMounted, watch, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import { useBooksStore } from '@/stores/bookStore';
import { useCategoryStore } from '@/stores/categoryStore';

const route = useRoute();
const bookStore = useBooksStore();
const categoryStore = useCategoryStore();
const search = ref('');
const currentPage = ref(1);
const getItemsPerPage = (width) => {
    if (width >= 1280) { 
        return 8;
    } else if (width >= 1024) { 
        return 6;
    } else if (width >= 640) { 
        return 2;
    } 
    else {
        return 1;
    }
};

const itemsPerPage = ref(getItemsPerPage(window.innerWidth)); 

const selectedCategory = ref(route.params.category || 'All');

const filteredBooks = computed(() => {
    return bookStore.books.filter(book =>
        book.title.toLowerCase().includes(search.value.toLowerCase())
    );
});

const paginatedBooks = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return filteredBooks.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
    return Math.ceil(filteredBooks.value.length / itemsPerPage.value);
});

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const updateItemsPerPage = () => {
    itemsPerPage.value = getItemsPerPage(window.innerWidth);
};

const fetchBook = async () => {
    if (selectedCategory.value === 'All') {
        await bookStore.fetchBook();
    } else {
        await bookStore.fetchBooksByCategory(selectedCategory.value);
    }
}

watch(() => route.params.category, (newCategory) => {
    selectedCategory.value = newCategory || 'All';
    fetchBook();
});

onMounted(() => {
    fetchBook();
    categoryStore.fecthCategory();
    window.addEventListener('resize', updateItemsPerPage);
});
</script>

<template>
    <div class="grid grid-cols-1 space-y-2 select-none">
        <div class="col-span-full">
            <div
                class="flex space-y-2 sm:space-y-0 flex-col sm:flex-row items-center justify-center sm:justify-between">
                <h2 class="text-2xl font-bold">
                    {{ selectedCategory }}
                </h2>
                <div class="flex items-center gap-4">
                    <ul class="menu lg:menu-horizontal bg-base-200 rounded-box hidden xl:block">
                        <li>
                            <details>
                                <summary>Category</summary>
                                <ul>
                                    <li>
                                        <RouterLink :to="{ name: 'book' }">
                                            All
                                        </RouterLink>
                                    </li>
                                    <li v-for="category in categoryStore.categories" :key="category.id">
                                        <RouterLink :to="{ name: 'book', params: { category: category.name } }">
                                            {{ category.name }}
                                        </RouterLink>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                    <div class="flex items-center mb-4 sm:mb-0">
                        <form class="sm:pr-3" action="#" method="GET">
                            <label class="input input-bordered flex items-center gap-2">
                                <input v-model="search" type="search" class="grow" placeholder="Search" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                    class="h-4 w-4">
                                    <path fill-rule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            <div v-for="book in paginatedBooks" :key="book.id" class="col-span-auto place-self-center">
                <div class="flex flex-col bg-gray-50/80 rounded-3xl shadow-xl w-full max-w-xs h-full">
                    <figure class="flex items-center justify-center p-6">
                        <img :src="book.image" class="w-full h-60 object-center" alt="book cover" />
                    </figure>
                    <div class="card-body px-4 pt-0 pb-6 gap-0">
                        <h2 class="card-title text-lg leading-6">
                            {{ book.title }}
                        </h2>
                        <span class="text-base">Stok: {{ book.stok }}</span>
                        <p class="text-base line-clamp-4">{{ book.summary }}</p>
                        <div class="card-actions justify-end my-2">
                            <RouterLink :to="{ name: 'detailBookUser', params: { id: book.id } }"
                                class="btn btn-neutral text-base font-bold rounded-3xl">Detail
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-full">
                <div class="join flex flex-wrap justify-end">
                    <button class="join-item btn" v-for="page in totalPages" :key="page" @click="goToPage(page)"
                        :class="{ 'btn-active': page === currentPage }">{{ page }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
