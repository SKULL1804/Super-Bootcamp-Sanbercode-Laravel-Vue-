<script setup>
// Import Swiper and modules
import { Swiper, SwiperSlide } from 'swiper/vue';
import SectionTitle from './section/TitleComponents.vue';
import Section from './section/SectionComponents.vue';
import { onMounted, ref } from 'vue';

const props = defineProps({
    portofolios: {
        type: Array,
        required: true,
    }
});

const swiperOptions = {
    components: {
        Swiper,
        SwiperSlide,
    },
};

const observer = ref(null);

onMounted(() => {
    observer.value = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('.lazy-load');
    images.forEach(img => observer.value.observe(img));
});
</script>

<template>
    <!-- Portofolio -->
    <Section>
        <SectionTitle title="Browse My Recent" subTitle="Portofolio" />

        <div class="my-8">
            <!-- Swiper for medium and smaller screens -->
            <div class="p-2 lg:px-0 lg:hidden">
                <swiper :options="swiperOptions" 
                :slides-per-view="'auto'" 
                :space-between="40" 
                :lazy=true 
                :breakpoints="{
                    768: {
                        slidesPerView: 2,
                    }
                }">
                    <swiper-slide v-for="portofolio in portofolios" :key="portofolio.id" >
                        <div class="card shadow-xl border border-gray-600 h-[80vh] transition-all duration-500">
                            <figure class="px-6 pt-6 sm:px-10 sm:pt-10">
                                <img :data-src="portofolio.image" :alt="portofolio.title" class="lazy-load rounded-lg object-cover opacity-0 transition-opacity duration-700 ease-in-out" />
                            </figure>
                            <div class="card-body items-center text-center">
                                <h2 class="card-title text-lg sm:text-xl text-gray-900">{{ portofolio.title }}</h2>
                                <p class="text-lg tracking-wide sm:text-xl">{{ portofolio.desription }}</p>
                                <div class="card-actions">
                                    <a :href="portofolio.linkGithub" target="_blank" class="btn btn-outline">GitHub</a>
                                </div>
                            </div>
                        </div>
                            
                    </swiper-slide>
                </swiper>
            </div>

            <!-- Grid for larger screens -->
            <div class="hidden lg:flex gap-8 flex-wrap justify-center">
                <div v-for="portofolio in portofolios" :key="portofolio.id"
                    class="card w-auto sm:w-96 shadow-xl border border-gray-600 ">
                    <figure class="px-10 pt-10">
                        <img :src="portofolio.image" :alt="portofolio.title" class="rounded-lg" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">{{ portofolio.title }}</h2>
                        <p>{{ portofolio.desription }}</p>
                        <div class="card-actions">
                            <a :href="portofolio.linkGithub" target="_blank" class="btn btn-outline">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Section>
    <!-- End Portofolio -->
</template>