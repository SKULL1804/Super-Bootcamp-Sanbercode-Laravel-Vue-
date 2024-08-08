<script setup>
import { onMounted } from 'vue'
import { useBorrowsStore } from '@/stores/borrowsStore'
import { useAuthStore } from '@/stores/authStore'

const borrowsStore = useBorrowsStore()
const authStore = useAuthStore()

const fetchHistory = async () => {
    try {
        await borrowsStore.history(authStore.currentUser.id)
    } catch (error) {
        console.error('Gagal mengambil data riwayat peminjaman:', error)
    }
}
const handleReturnBook = async (borrowId) => {
    try {
        await borrowsStore.returnBook(borrowId)
        await fetchHistory()
    } catch (error) {
        console.error('Gagal mengembalikan buku:', error)
    }
}

onMounted(() => {
    fetchHistory()
})
</script>

<template>
    <div class="mx-5 xl:mx-0 my-10">
        <div class="grid grid-cols-1 xl:grid-cols-1 xl:gap-4">
            <div class="col-span-full">
                <div class="flex flex-col bg-gray-100 rounded-3xl w-full shadow-xl select-none">
                    <div class="card-body">
                        <h2 class="text-2xl font-bold mb-4">Riwayat Peminjaman</h2>
                        <div v-for="(borrow) in borrowsStore.borrows" :key="borrow.id" class="card lg:card-side">
                            <figure>
                                <img :src="borrow.book.image" :alt="borrow.book.title" />
                            </figure>
                            <div class="card-body">
                                <h2 class="card-title">{{ borrow.book.title }}</h2>
                                <p>Pemijaman : {{ borrow.borrow_date
                                    }}</p>
                                <div class="card-actions justify-end">
                                    <button v-if="!borrow.returned" @click="handleReturnBook(borrow.id)"
                                        class="btn btn-primary text-gray-50 rounded-xl">
                                        Kembalikan Buku
                                    </button>
                                    <span v-else class="text-gray-500">Sudah Dikembalikan</span>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="overflow-x-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody class="space-y-2">
                                    <tr v-for="(borrow, index) in borrowsStore.borrows" :key="borrow.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                            <div class="flex items-center gap-3">
                                                <div class="w-20">
                                                    <img :src="borrow.book.image" :alt="borrow.book.title" />
                                                </div>
                                                <div class="flex flex-col">
                                                    <h1 class="font-bold">{{ borrow.book.title }}</h1>
                                                    <span class="text-sm font-medium">Pemijaman : {{ borrow.borrow_date
                                                        }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button v-if="!borrow.returned" @click="handleReturnBook(borrow.id)"
                                                class="btn btn-primary text-gray-50 rounded-xl">
                                                Kembalikan Buku
                                            </button>
                                            <span v-else class="text-gray-500">Sudah Dikembalikan</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
