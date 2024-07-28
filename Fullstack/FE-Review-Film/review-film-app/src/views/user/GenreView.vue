<script setup>
import Genre from '../../components/layouts/GenreComponents.vue';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import film1 from '@/assets/img/movie/film-1.jpg';
import film2 from '@/assets/img/movie/film-2.jpg';
import film3 from '@/assets/img/movie/film-3.jpg';
import film4 from '@/assets/img/movie/film-4.jpg';
import film5 from '@/assets/img/movie/film-5.jpg';
import film6 from '@/assets/img/movie/film-6.jpg';
import film7 from '@/assets/img/movie/film-7.jpg';
import film8 from '@/assets/img/movie/film-8.jpg';

const route = useRoute();
const genreName = ref(route.params.name ? route.params.name.toLowerCase() : '');

const movies = ref([
    {
        id: 1,
        name: 'One Piece Film: Red',
        img: film1,
        genre: 'Action, Adventure, Animation'
    },
    {
        id: 2,
        name: 'Bohemian Rhapsody',
        img: film2,
        genre: 'Biography, Drama, Music'
    },
    {
        id: 3,
        name: 'Eiga Given: Hiiragi mix',
        img: film3,
        genre: 'Animation, Romance, Music'
    },
    {
        id: 4,
        name: 'IF',
        img: film4,
        genre: 'Animation, Comedy, Fantasy, Family'
    },
    {
        id: 5,
        name: 'HAIKYU!! The Dumpster Battle',
        img: film5,
        genre: 'Animation, Drama, Comedy, Sport'
    },
    {
        id: 6,
        name: 'Oppenheimer',
        img: film6,
        genre: 'Biography, Drama, History'
    },
    {
        id: 7,
        name: 'Kimetsu no Yaiba The Movie: Mugen Train',
        img: film7,
        genre: 'Action, Animation, Adventure, Fantasy, Thriller'
    },
    {
        id: 8,
        name: 'Kimetsu no Yaiba The Movie: To the Hashira Training',
        img: film8,
        genre: 'Animation, Action, Fantasy'
    },
]);

const filteredMovies = computed(() => {
    return movies.value.filter(movie => 
        movie.genre.toLowerCase().split(', ').includes(genreName.value)
    );
});

watch(() => route.params.name, (newGenre) => {
    genreName.value = newGenre ? newGenre.toLowerCase() : '';
});
</script>

<template>
    <Genre :movies="filteredMovies"/>
</template>
