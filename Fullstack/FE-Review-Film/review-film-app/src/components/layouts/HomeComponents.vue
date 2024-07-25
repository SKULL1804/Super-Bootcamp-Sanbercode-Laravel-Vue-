<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';

const props = defineProps({
    tredings: {
        type: Array,
        required: true
    },
})

const swiperOptions = {
    components: {
        Swiper,
        SwiperSlide,
    },
};

</script>

<template>
    <section class="box-border h-fit pt-[4vh] mb-0 mt-0 mx-[5%] space-y-2">
        <div class="flex items-start justify-start select-none">
            <h1 class="text-3xl lg:text-5xl font-bold">Trending</h1>
        </div>
        <div class="flex items-center justify-center gap-4 ">
            <swiper :modules="[Autoplay]" :options="swiperOptions" :slides-per-view="1" :space-between="40" :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
            }" :lazy=true :breakpoints="{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }">
                <swiper-slide v-for="treding in props.tredings" :key="treding.id">
                    <div class="relative group cursor-pointer">
                        <figure class="overflow-hidden rounded-3xl ">
                            <img class=" w-full max-h-96" :src="treding.img" :alt="treding.name" />
                            <figcaption
                                class="absolute inset-x-0 bottom-0 h-1/2 flex flex-col items-center justify-stretch p-4 bg-gray-100/20 backdrop-blur-md bg-opacity-50 text-gray-50 opacity-0 transition duration-500 transform translate-y-6 group-hover:duration-150 group-hover:opacity-100 group-hover:translate-y-0 rounded-b-3xl">
                                <div
                                    class="transition duration-500 delay-700 opacity-0 transform -translate-y-5 group-hover:opacity-100 group-hover:translate-y-0">
                                    <h2 class="text-sm font-bold">{{ treding.name }}</h2>
                                    <span class="text-sm">{{ treding.genre }}</span>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>
