<script setup>
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBooksStore } from "@/stores/bookStore";
import { useAuthStore } from '@/stores/authStore';

const route = useRoute();
const bookId = route.params.id;
const authStore = useAuthStore();
const bookStore = useBooksStore();
onMounted( () => {
    bookStore.detailBook(bookId);
});
</script>

<template>
      <div class="mx-5 xl:mx-0 my-10">
        <div
            class="flex flex-col shadow-lg sm:flex-row items-center justify-between bg-gray-100 rounded-3xl">
            <div class="w-full mb-1">
                <div class="card-body px-12">
                    <div class="mb-4">
                        <div class="block space-y-2 sm:space-x-0 justify-between items-center sm:flex">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl "> {{ bookStore.currentBook?.title }}
                            </h1>
                            <RouterLink :to="{ name: 'book' }" class="btn btn-primary rounded-3xl text-white" type="button">
                                Back
                            </RouterLink>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 space-y-2">
                        <div class="col-span-full sm:col-auto">
                            <figure class="flex items-center justify-center">
                                <img class="w-60 h-full object-cover rounded-md" :src="bookStore.currentBook?.image" 
                                    :alt="bookStore.currentBook?.title"/>
                            </figure>
                        </div>
                        <div class="col-span-2 space-y-2">
                            <div class="grid grid-cols-6 gap-2">
                                <div class="col-span-6 sm:col-span-1">
                                    <span class="text-sm font-medium text-gray-600">Stok</span>
                                    <p class="font-bold sm:text-sm">{{ bookStore.currentBook?.stok }}</p>
                                </div>
                                <div class="col-span-6 sm:col-span-1">
                                    <span class="text-sm font-medium text-gray-600">Category</span>
                                    <p class="font-bold sm:text-sm">{{ bookStore.currentBook?.category.name }}</p>
                                </div>
                                <div class="col-span-6">
                                    <span class="text-sm font-medium text-gray-900 leading-7">Description</span>
                                    <p class="text-gray-600 sm:text-sm">{{ bookStore.currentBook?.summary }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-actions justify-end">
                        <RouterLink  v-if="authStore.tokenUser" :to="{ name: 'borrows', query: { book_id: bookStore.currentBook?.id } }"  class="btn btn-neutral text-base font-bold rounded-3xl"> Borrows
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>