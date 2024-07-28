<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useGenreStore } from '@/stores/genreStore'; 

const isOpen = ref(false);
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};

const genreStore = useGenreStore(); 
const authStore = useAuthStore();

const handleLogout = () => {
    authStore.logout();
};

const firstLetter = computed(() => {
    return authStore.currentUser?.username.charAt(0).toUpperCase();
});

const dropdonwClass = computed(() => {
    return authStore.tokenUser ? 'btn btn-ghost btn-circle avatar placeholder' : 'btn btn-ghost btn-circle';
})

onMounted(() => {
    genreStore.fetchGenre(); // Fetch genres on component mount
});
</script>

<template>
    <div class="drawer z-10">
        <input type="checkbox" class="drawer-toggle" v-model="isOpen" />
        <div class="drawer-content flex flex-col">
            <!-- Navbar -->
            <nav class="navbar items-center justify-between xl:px-12">
                <!-- Side Menu Ukuran sm,nd dan lg -->
                <div class="xl:hidden flex-none items-center justify-center">
                    <label aria-label="open sidebar" class="btn btn-ghost xl:hidden" @click="toggleMenu">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-8 w-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>

                <!-- Navbar Menu Ukuran xl -->
                <div class="flex items-center justify-center">
                    <RouterLink to="/" class="btn btn-ghost text-xl inline-flex hover:bg-inherit">Review Film
                    </RouterLink>
                    <div class="hidden xl:flex">
                        <ul class="menu menu-horizontal px-1 hidden lg:flex">
                            <li>
                                <RouterLink to="/" class="text-xl font-medium">Home</RouterLink>
                            </li>
                            <li>
                                <details>
                                    <summary class="text-xl font-medium">Genre</summary>
                                    <ul class="menu bg-base-100 w-56">
                                        <li v-for="genre in genreStore.genres" :key="genre.id">
                                            <RouterLink :to="'/genre/' + genre.name" class="text-base font-medium">
                                                {{ genre.name }}
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'film' }" class="text-xl font-medium">Film</RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'cast' }" class="text-xl font-medium">Cast</RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Dropdown Menu sm, md, dan lg -->
                <div class="xl:hidden flex items-center justify-center">
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" :class="dropdonwClass">
                            <template v-if="!authStore.tokenUser">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
                                </svg>
                            </template>
                            <template v-else>
                                <div class="text-neutral-content w-24 rounded-full">
                                    <span class="text-2xl">{{ firstLetter }}</span>
                                </div>
                            </template>
                        </div>
                        <ul tabindex="0"
                            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <template v-if="authStore.tokenUser">
                                <template v-if="authStore.currentUser?.email_verified_at">
                                    <li>
                                        <RouterLink :to="{ name: 'profile' }" class="text-base">
                                            Profile
                                        </RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink :to="{ name: 'settings' }" class="text-base">
                                            Settings
                                        </RouterLink>
                                    </li>
                                </template>
                                <template v-else>
                                    <li>
                                        <RouterLink :to="{ name: 'verifikasi-akun' }" class="text-base">Verifikasi Akun
                                        </RouterLink>
                                    </li>
                                </template>
                                <li>
                                    <button @click="handleLogout" class="text-base">Logout</button>
                                </li>
                            </template>
                            <template v-else>
                                <li>
                                    <RouterLink :to="{ name: 'login' }" class="text-base">Login</RouterLink>
                                </li>
                                <li>
                                    <RouterLink :to="{ name: 'register' }" class="text-base">Register</RouterLink>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>

                <!-- Dropdown Menu xl-->
                <div class="hidden xl:gap-2 xl:flex">
                    <RouterLink v-if="!authStore.tokenUser" :to="{ name: 'login' }" class="btn btn-ghost text-xl">Login
                    </RouterLink>
                    <RouterLink v-if="!authStore.tokenUser" :to="{ name: 'register' }" class="btn btn-ghost text-xl">
                        Register
                    </RouterLink>
                    <template v-else>
                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar placeholder">
                                <div class="text-neutral-content w-24 rounded-full">
                                    <span class="text-2xl">{{ firstLetter }}</span>
                                </div>
                            </div>
                            <ul tabindex="0"
                                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <template v-if="authStore.currentUser?.email_verified_at">
                                    <li>
                                        <RouterLink :to="{ name: 'profile' }" class="text-base">Profile</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink :to="{ name: 'settings' }" class="text-base">
                                            Settings
                                        </RouterLink>
                                    </li>
                                </template>
                                <template v-else>
                                    <li>
                                        <RouterLink :to="{ name: 'verifikasi-akun' }" class="text-base">Verifikasi Akun
                                        </RouterLink>
                                    </li>
                                </template>
                                <li><button @click="handleLogout" class="text-base">Logout</button></li>
                            </ul>
                        </div>
                    </template>
                </div>
            </nav>
            <!-- Page content here -->
        </div>

        <div class="drawer-side" :class="{ 'drawer-open': isOpen }">
            <label class="drawer-overlay" @click="toggleMenu"></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <!-- Sidebar content here -->
                <li>
                    <RouterLink :to="{ name: 'home' }" class="text-base font-medium" @click="toggleMenu">Home
                    </RouterLink>
                </li>
                <li>
                    <details>
                        <summary class="text-base font-medium">Genre</summary>
                        <ul>
                            <li v-for="genre in genres" :key="genre.id">
                                <RouterLink :to="'/genre/' + genre.name" @click="toggleMenu"
                                    class="text-base font-medium">
                                    {{ genre.name }}
                                </RouterLink>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <RouterLink :to="{ name: 'film' }" class="text-base font-medium" @click="toggleMenu">Film
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'cast' }" class="text-base font-medium" @click="toggleMenu">Cast
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
