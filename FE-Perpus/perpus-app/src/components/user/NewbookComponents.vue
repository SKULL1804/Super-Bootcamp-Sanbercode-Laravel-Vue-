<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import NewBook1 from '@/assets/img/cover/cover6.jpg';
import NewBook2 from '@/assets/img/cover/cover7.jpg';
import NewBook3 from '@/assets/img/cover/cover8.jpeg';
import NewBook4 from '@/assets/img/cover/cover9.jpg';

const swiperOptions = {
    components: {
        Swiper,
        SwiperSlide,
    },
};

const newBooks = [
    {
        id: 1,
        title: 'Dr. Stone',
        img: NewBook1,
        genre: 'Fiksi Sains'
    },
    {
        id: 2,
        title: 'Shokugeki no Souma',
        img: NewBook2,
        genre: 'Drama'
    },
    {
        id: 3,
        title: 'One Puch Man',
        img: NewBook3,
        genre: 'Action'
    },
    {
        id: 3,
        title: 'Go-toubun no Hanayomes',
        img: NewBook4,
        genre: 'ROmance'
    },
]
</script>

<template>
    <section class="space-y-4 mt-2">
        <h2 class="text-2xl font-bold">Buku Terbaru</h2>
        <div class="flex items-stretch gap-4 ">
            <swiper :options="swiperOptions" :slides-per-view="'auto'" :space-between="40" :breakpoints="{
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
                <swiper-slide v-for="newBook in newBooks" :key="newBook.id">
                    <div class="flex flex-col bg-base-300 rounded-3xl shadow-xl w-full max-w-xs h-full">
                        <figure class="flex items-center justify-center p-6">
                            <img :src="newBook.img" class="w-full h-60 object-center" :alt="newBook.title" />
                        </figure>
                        <div class="card-body px-4 pt-0 pb-6">
                            <h2 class="card-title text-base leading-6">{{ newBook.title }}</h2>
                            <p class="text-base">{{ newBook.genre }}</p>
                            <div class="flex justify-end">
                                <button class="btn btn-neutral text-base font-bold rounded-3xl">Detail</button>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<style scoped>
.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>