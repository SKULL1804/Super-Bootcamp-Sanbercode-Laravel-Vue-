<script setup>
import Film from '@/components/layouts/FilmComponents.vue';
import { ref, computed } from 'vue';
import film1 from '@/assets/img/movie/film-1.jpg';
import film2 from '@/assets/img/movie/film-2.jpg';
import film3 from '@/assets/img/movie/film-3.jpg';
import film4 from '@/assets/img/movie/film-4.jpg';
import film5 from '@/assets/img/movie/film-5.jpg';
import film6 from '@/assets/img/movie/film-6.jpg';
import film7 from '@/assets/img/movie/film-7.jpg';
import film8 from '@/assets/img/movie/film-8.jpg';
import film9 from '@/assets/img/movie/film-9.jpg';

const movies = [
    {
        id: 1,
        name: 'One Piece',
        img: film1,
        description: 'With his straw hat and ragtag crew, young pirate Monkey D. Luffy goes on an epic voyage for treasure.'
    },
    {
        id: 2,
        name: 'Bohemian Rhapsody',
        img: film2,
        description: 'Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock n roll band Queen in 1970....'
    },
    {
        id: 3,
        name: 'Given',
        img: film3,
        description: 'The relationship between a band’s bassist, their drummer, and the drummer’s roommate and ex-boyfriend, who is a professional violinist.'
    },
    {
        id: 4,
        name: 'IF',
        img: film4,
        description: 'A young girl who goes through a difficult experience begins to see everyone’s imaginary friends who have been left behind as their real-life friends have grown up.'
    },
    {
        id: 5,
        name: 'HAIKYU!! The Dumpster Battle',
        img: film5,
        description: 'Shoyo Hinata joins Karasuno High’s volleyball club to be like his idol, a former Karasuno player known as the ’Little Giant’. But Hinata soon learns that he must team up with his middle school nemesis, Tobio Kageyama....'
    },
    {
        id: 6,
        name: 'Oppenheimer',
        img: film6,
        description: 'The story of J. Robert Oppenheimer’s  role in the development of the atomic bomb during World War II.'
    },
    {
        id: 7,
        name: 'The Boy and the Heron ',
        img: film9,
        description: ' While the Second World War rages, the teenage Mahito, haunted by his mothers tragic death, is relocated from Tokyo to the serene rural home of his new stepmother Natsuko...'
    },
    {
        id: 8,
        name: 'Kimetsu no Yaiba The Movie: Mugen Train',
        img: film7,
        description: 'Tanjiro Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar’s head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps....'
    },
    {
        id: 9,
        name: 'Kimetsu no Yaiba The Movie: To the Hashira Training',
        img: film8,
        description: 'A compilation film featuring the eleventh episode of the Swordsmith Village Arc and the first episode of the Hashira Training Arc.'
    },
];

const currentPage = ref(1);
const itemsPerPage = ref(4);

const totalPages = computed(() => {
    return Math.ceil(movies.length / itemsPerPage.value);
});

const paginatedMovies = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return movies.slice(start, end);
});

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const canGoToPreviousPage = computed(() => currentPage.value > 1);
const canGoToNextPage = computed(() => currentPage.value < totalPages.value);
</script>

<template>
    <div>
        <section class="h-fit pt-[4vh] mb-0 mt-0 mx-[5%] space-y-2">
            <div class="flex items-start justify-start select-none">
                <h1 class="text-3xl lg:text-5xl font-bold capitalize">Movies</h1>
            </div>
            <Film :movies="paginatedMovies"/>
    
            <div class="flex items-center justify-between">
                <button class="join-item btn btn-outline" @click="previousPage" :disabled="!canGoToPreviousPage">
                    Previous page
                </button>
                <button class="join-item btn btn-outline" @click="nextPage" :disabled="!canGoToNextPage">
                    Next page
                </button>
            </div>
        </section>
    </div>
</template>