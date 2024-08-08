<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, onMounted } from 'vue';
import { useBooksStore } from '@/stores/bookStore';

const bookStore = useBooksStore();
const populers = ref([]);
const allBooks = ref([]);

const fetchBooks = async () => {
    await bookStore.fetchBook();
    populers.value = bookStore.getPopularBooks();
    allBooks.value = bookStore.books.slice(0, 5);
};

onMounted(() => {
    fetchBooks();
});

const swiperOptions = {
    components: {
        Swiper,
        SwiperSlide,
    },
};
</script>

<template>
    <div class="bg-slate-300 shadow-xl rounded-3xl">
        <div class="flex flex-col xl:flex-row">
            <div class="flex flex-col place-items-center p-8 xl:w-1/3 space-y-2 xl:ps-12">
                <h2 class="text-2xl xl:text-5xl font-bold uppercase xl:me-10">BUKU TERLARIS POPULER</h2>
                <p class="capitalize">Lihat koleksi buku paling populer yang dipilih khusus untuk Anda.
                    Temukan bacaan favorit baru Anda hari ini!</p>
            </div>

            <div class="flex p-8 xl:w-2/3 xl:ps-2 pt-0 xl:pt-8">
                <swiper :options="swiperOptions" :slides-per-view="1" :space-between="40" :breakpoints="{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }">
                    <swiper-slide v-for="(populer, index) in populers" :key="index">
                        <img :src="populer.image" class="w-56 h-72 rounded-lg shadow-lg">
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <div class="flex flex-col xl:flex-row ">
            <div class="flex place-items-center flex-col p-8 xl:w-1/3 space-y-2 xl:ps-12">
                <h2 class="text-2xl xl:text-5xl font-bold uppercase xl:me-4">Temukan Sesuatu yang Menarik</h2>
                <p class="capitalize">Periksa koleksi buku terbaru kami dan temukan cerita yang menarik untuk dibaca!
                </p>
            </div>

            <!-- Medium on slider -->
            <div class="flex items-center p-8 lg:px-16 lg:pb-8 pt-0 w-full overflow-hidden">
                <swiper :options="swiperOptions" :slides-per-view="1" :space-between="40" :breakpoints="{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }">
                    <swiper-slide v-for="(allBook, index) in allBooks" :key="index">
                        <img :src="allBook.image" alt="New Book Book" class="w-56 h-72 rounded-lg shadow-lg">
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<style scoped>
.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>