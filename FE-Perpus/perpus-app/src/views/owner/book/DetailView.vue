<script setup>
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBooksStore } from "@/stores/bookStore";

const route = useRoute();
const bookId = route.params.id;
const bookStore = useBooksStore();

onMounted(() => {
    bookStore.detailBook(bookId);
});
</script>

<template>
    <section class="p-4 pt-6">
        <div class="p-4 card shadow-lg sm:flex items-center justify-between lg:mt-1.5 bg-gray-100 rounded-3xl">
            <div class="w-full mb-1">
                <div class="card-body">
                    <div class="mb-4">
                        <div class="block space-y-2 sm:space-x-0 justify-between items-center sm:flex">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"> Detail Book
                            </h1>
                            <RouterLink :to="{ name: 'bookOwner' }" class="btn btn-primary rounded-lg text-white"
                                type="button">
                                Back
                            </RouterLink>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 space-y-2">
                        <div class="col-span-full sm:col-auto">
                            <figure>
                                <img class="w-60 h-full object-cover rounded-md" :src="bookStore.currentBook?.image"
                                    :alt="bookStore.currentBook?.title" />
                            </figure>
                        </div>
                        <div class="col-span-2 space-y-2">
                            <div class="grid grid-cols-6 gap-2">
                                <div class="col-span-6 sm:col-span-2">
                                    <span class="text-sm font-medium text-gray-600">Judul</span>
                                    <p class="font-bold sm:text-sm">{{ bookStore.currentBook?.title }}</p>
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <span class="text-sm font-medium text-gray-600">Stok</span>
                                    <p class="font-bold sm:text-sm">{{ bookStore.currentBook?.stok }}</p>
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <span class="text-sm font-medium text-gray-600">Category</span>
                                    <p class="font-bold sm:text-sm">{{ bookStore.currentBook?.category.name }}</p>
                                </div>
                                <div class="col-span-6">
                                    <span class="text-sm font-medium text-gray-900 leading-7">Description</span>
                                    <p class="text-gray-600 sm:text-sm">{{ bookStore.currentBook?.summary }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-full">
                            
                            <div class="overflow-x-auto" v-if="bookStore.currentBook?.list_borrows">
                                <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"> Daftar Pemijaman
                                </h1>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>User Load</th>
                                            <th>Borrows Date</th>
                                        </tr>
                                    </thead>
                                    <tbody class="space-y-2">
                                        <tr  v-for="(borrow, index) in bookStore.currentBook.list_borrows" :key="borrow.id" >
                                            <td>{{ index + 1 }}</td>
                                            <td>
                                                <div class="flex items-center gap-3">
                                                    <div class="flex flex-col">
                                                        <div class="flex flex-col">
                                                            <h1 class="font-bold">{{ borrow.user?.name }}</h1>
                                                            <span class="text-sm opacity-50">{{ borrow.load_date }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="font-bold text-sm opacity-50">{{ borrow.borrow_date }}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>