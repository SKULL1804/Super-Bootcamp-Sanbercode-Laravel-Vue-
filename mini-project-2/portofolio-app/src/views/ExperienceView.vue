<script setup>
import Experience from '../components/ExperienceComponents.vue';
import ExperienceSkeleton from '../components/skeleton/EkperienceSkeleton.vue';
import { ref, onMounted} from 'vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000); // 
});
const experiences = [
    {
        id: 1,
        icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z',
        style: 'timeline-start mb-10 md:text-end',
        tahun: '2022 - 2024',
        tempat: 'SMK Nurul Islam Jakarta',
        description: ' Sekolah selama 3 tahun di <span class="font-semibold">SMK Nurul Islam Jakarta</span> mengambil jurusan Rekayasa Perangkat Lunak. Pernah mengikuti beberapa organisasi sekolah OSIS, Dewan Ambalan dan Basket dan nilai US 84,73.',
    },

    {
        id: 2,
        icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z',
        style: 'timeline-end mb-10',
        tahun: '2023',
        tempat: 'LPK CYBERMEDIA COLLEGE',
        description: 'Pengalaman Kerja Lapangan (PKL) di LPK CYBERMEDIA COLLEGE atau dikenal sebagai CYBERMEDIA CENTER (CMC) sebagai web developer selama 6 bulan dari September 2022 - Febuari 2023.'
    }
]
</script>

<template>
    <div>
        <ExperienceSkeleton v-if="isLoading"/>
        <Experience :experiences="experiences" v-else />
    </div>
</template>