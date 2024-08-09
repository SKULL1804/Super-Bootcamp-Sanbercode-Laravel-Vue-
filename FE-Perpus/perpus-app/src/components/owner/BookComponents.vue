<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { useBooksStore } from "@/stores/bookStore";
import { useCategoryStore } from "@/stores/categoryStore";

const categoryStore = useCategoryStore();
const bookStore = useBooksStore();
const search = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(5);

const getCategoryId = (id) => {
    const category = categoryStore.categories.find(category => category.id === id);
    return category ? category.name : 'Unknown';
};

const deleteBook = async (id) => {
    await bookStore.deleteBook(id);
};

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

const goToPage = async (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        await bookStore.fetchBook(); 
    }
};

onMounted(async () => {
    await bookStore.fetchBook(); 
    await categoryStore.fecthCategory(); 
});
</script>

<template>
    <section class="p-4 pt-6">
        <div class="p-4 card shadow-lg sm:flex items-center justify-between lg:mt-1.5 bg-gray-100 rounded-3xl">
            <div class="w-full mb-1">
                <div class="card-body">
                    <div class="mb-4">
                        <div class="flex justify-between items-center">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">All Books</h1>
                        </div>
                    </div>
                    <div class="items-center justify-between block sm:flex">
                        <div class="flex items-center mb-4 sm:mb-0">
                            <form class="sm:pr-3" action="#" method="GET">
                                <label class="input input-bordered flex items-center gap-2 w-10">
                                    <input v-model="search" type="text" class="grow" placeholder="Search" />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        class="h-4 w-4 opacity-70">
                                        <path fill-rule="evenodd"
                                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </label>
                            </form>
                        </div>
                        <RouterLink :to="{ name: 'createBook' }" class="btn btn-primary text-white rounded-lg">
                            Add Book
                        </RouterLink>
                    </div>
                    <div v-if="bookStore.loading" class="flex justify-center items-center h-64">
                        <span class="loading loading-infinity loading-lg"></span>
                    </div>
                    <div v-else class="overflow-x-auto">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody class="space-y-2">
                                <tr v-for="(book, index) in paginatedBooks" :key="book.id">
                                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td> 
                                    <td>
                                        <div class="flex items-center gap-3">
                                            <div class="w-20">
                                                <img :src="book.image" :alt="book.title" />
                                            </div>
                                            <div class="flex flex-col">
                                                <div class="font-bold">{{ book.title }}</div>
                                                <span class="text-sm opacity-50">{{ getCategoryId(book.category_id) }}</span>
                                                <p class="line-clamp-6 w-96">
                                                    {{ book.summary }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex flex-wrap items-center gap-2">
                                            <RouterLink :to="{ name: 'detailBook', params: {id: book.id} }" class="btn btn-secondary text-white btn-xs capitalize">details</RouterLink>
                                            <RouterLink :to="{ name: 'editBook', params: { id: book.id } }"
                                                class="btn btn-primary text-white btn-xs capitalize">update</RouterLink>
                                            <button @click="deleteBook(book.id)"
                                                class="btn btn-error text-white btn-xs capitalize">delete</button>
                                        </div>
                                    </td>
                                </tr> 
                            </tbody>
                        </table>
                        <div class="join flex justify-end mt-4">
                            <button class="join-item btn" v-for="page in totalPages" :key="page" @click="goToPage(page)"
                                :class="{ 'btn-active': page === currentPage }">{{ page }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
