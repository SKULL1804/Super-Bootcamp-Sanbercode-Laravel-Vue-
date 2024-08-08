<script setup>
import { useCategoryStore } from "@/stores/categoryStore";
import { useBorrowsStore } from "@/stores/borrowsStore";
import { ref, computed, onMounted } from 'vue';

const categoryStore = useCategoryStore();
const borrowsStore = useBorrowsStore();
const currentPage = ref(1);
const itemsPerPage = ref(5);

const getCategoryId = (id) => {
    const category = categoryStore.categories.find(category => category.id === id);
    return category ? category.name : 'Unknown';
};

const paginatedBorrows = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return borrowsStore.borrows.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
    return Math.ceil(borrowsStore.borrows.length / itemsPerPage.value);
});

const isOverdue = (loadDate) => {
    const loadDateTime = new Date(loadDate);
    const currentDateTime = new Date();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    return currentDateTime - loadDateTime > oneDayInMilliseconds;
};

const goToPage = async (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        await borrowsStore.fetchBorrows();
    }
};

const handleReturnBook = async (borrowId, loadDate) => {
    if (isOverdue(loadDate)) {
        const confirmReturn = confirm('Tanggal pengembalian telah melewati jangka waktu yang diperbolehkan. Apakah Anda ingin mengonfirmasi pengembalian buku ini?');
        if (!confirmReturn) return;
    }
    try {
        await borrowsStore.returnBook(borrowId);
        await borrowsStore.fetchBorrows();
    } catch (error) {
        console.error('Failed to return the book:', error);
    }
};

onMounted( async () => {
    await borrowsStore.fetchBorrows();
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
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">All Borrows</h1>
                        </div>
                    </div>
                    <div v-if="borrowsStore.loading" class="flex justify-center items-center h-64">
                        <span class="loading loading-infinity loading-lg"></span>
                    </div>
                    <div v-else class="overflow-x-auto">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Borrow Date</th>
                                    <th>Return Date</th>
                                </tr>
                            </thead>
                            <tbody class="space-y-2">
                                <tr v-for="(borrow, index) in paginatedBorrows" :key="borrow.id">
                                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                    <td>
                                        <div class="flex items-center gap-3">
                                            <div class="w-20">
                                                <img :src="borrow.book.image" :alt="borrow.book.title" />
                                            </div>
                                            <div class="flex flex-col">
                                                <h1 class="font-bold">{{ borrow.book.title }}</h1>
                                                <span class="text-sm opacity-50 font-semibold">{{ getCategoryId(
                                                    borrow.book.category_id) }}</span>
                                                <span class="text-sm opacity-50 line-clamp-4 w-96">{{
                                                    borrow.book.summary }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex items-center gap-3">
                                            <div class="flex flex-col">
                                                <div class="flex flex-col">
                                                    <h1 class="font-bold">{{ borrow.user.name }}</h1>
                                                    <span class="text-sm opacity-50">{{ borrow.borrow_date }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span v-if="borrow.returned" class="font-bold text-sm opacity-50">Sudah
                                            Dikembalikan</span>
                                        <span v-else>
                                            <span v-if="!isOverdue(borrow.load_date)"
                                                class="font-bold text-sm opacity-50">{{ borrow.load_date }}</span>

                                            <button v-if="isOverdue(borrow.load_date)"
                                                @click="handleReturnBook(borrow.id, borrow.load_date)"
                                                class="btn btn-primary mt-2 text-gray-50 rounded-xl">
                                                Kembalikan Buku
                                            </button>
                                        </span>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="join flex justify-end mt-4">
                            <button class="join-item btn" :class="{ 'btn-active': page === currentPage.value }"
                                v-for="page in totalPages" :key="page" @click="goToPage(page)">
                                {{ page }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
