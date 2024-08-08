<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBorrowsStore } from '@/stores/borrowsStore';
import { useBooksStore } from '@/stores/bookStore';

const borrowsStore = useBorrowsStore();
const booksStore = useBooksStore();
const route = useRoute();
const bookId = route.query.book_id || '';

const input = reactive({
    book_id: bookId,
    load_date: "",
    borrow_date: "",
});

const submitForm = async () => {
    try {
        await borrowsStore.createOrUpdateBorrows(input);
        input.book_id = '';
        input.borrow_date = '';
        input.load_date = '';
    } catch (error) {
        console.log(error);
    }
}

onMounted(async () => {
    await booksStore.fetchBook();
});

</script>

<template>
    <section class="mx-5 xl:mx-0 my-10">
        <div class="grid grid-cols-1 xl:grid-cols-3 xl:gap-4">
            <div class="col-span-full">
                <div class="flex flex-col bg-gray-100 rounded-3xl w-full shadow-xl">
                    <div class="card-body">
                        <form @submit.prevent="submitForm" class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 md:col-span-3">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text">Buku</span>
                                    </div>
                                    <select v-model="input.book_id" class="select select-bordered w-full">
                                        <option disabled selected value="">Pilih Buku</option>
                                        <option v-for="book in booksStore.books" :key="book.id" :value="book.id">
                                            {{ book.title }}
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div class="col-span-6 md:col-span-3 space-y-2">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text">Pemijaman Tanggal</span>
                                    </div>
                                    <input v-model="input.borrow_date" type="date"
                                        class="input input-bordered w-full" />
                                </label>
                            </div>
                            <div class="col-span-6 md:col-span-3 space-y-2">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text">Pengembalian Tanggal</span>
                                    </div>
                                    <input v-model="input.load_date" type="date" class="input input-bordered w-full" />
                                </label>
                            </div>
                            <div class="col-span-6 md:col-span-3">
                                <div class="card-actions justify-end">
                                    <button type="submit" class="btn btn-outline mt-9 rounded-3xl">Add</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>