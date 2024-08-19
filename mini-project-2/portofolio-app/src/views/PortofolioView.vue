<script setup>
import Portofolio from '../components/PortofolioComponents.vue';
import ProjectOne from '../assets/img/project-1.png';
import ProjectTwo from '../assets/img/project-2.png';
import ProjectThree from '../assets/img/project-3.png';
import ProjectFour from '../assets/img/project-4.png';
import PortofolioSkeleton from '../components/skeleton/PortofolioSkeleton.vue';
import { ref, onMounted} from 'vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000); // 
});

const portofolios = [
    {
        id: 1,
        image: ProjectOne,
        title: 'Absensi App',
        desription: 'Aplikasi berbasis Web untuk Absensi Karyawan menggunakan Laravel, Boostrap Livewire dan MySQL',
        linkGithub: 'https://github.com/SKULL1804/Absensi-Karyawan-CyberMedia-Center',
    },

    {
        id: 2,
        image: ProjectTwo,
        title: 'Pendaftaran App',
        desription: 'Aplikasi berbasis Web untuk Pendaftaran Peserta LPK CYBERMEDIA COLLEGE menggunakan Laravel, Boostrap dan MySQL',
        linkGithub: 'https://github.com/SKULL1804/Pendaftaran-Peserta-Diklat-CyberMedia-Center',
    },

    {
        id: 3,
        image: ProjectThree,
        title: 'Perpus Nuris App',
        desription: 'Aplikasi berbasis Web untuk Membaca Buku Secara Online menggunakan Laravel, Boostrap dan MySQL',
        linkGithub: 'https://github.com/SKULL1804/perpus-app',
    },

    {
        id: 4,
        image: ProjectFour,
        title: 'Perpustakaan App',
        desription: 'Aplikasi berbasis Web untuk Meminjam Buku Secara Online menggunakan Laravel, Tailwind, VueJs dan MySQL, Project dari SanberCode',
        linkDeploy: 'https://perpus-app.vercel.app/',
    }
]
</script>

<template>
    <div>
        <PortofolioSkeleton v-if="isLoading"/>
        <Portofolio :portofolios="portofolios" v-else />
    </div>
</template>