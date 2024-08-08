<script setup>
import { ref, onMounted, onUnmounted, computed, inject } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useCategoryStore } from "@/stores/categoryStore";

const authStore = useAuthStore();
const categoryStore = useCategoryStore();

const isOpen = inject('isOpen');
const toggleMenu = inject('toggleMenu');

const isScrolled = ref(false);
const handleScroll = () => {
    if (window.scrollY > 0) {
        isScrolled.value = true;
    } else {
        isScrolled.value = false;
    }
};

const firstLetter = computed(() => {
    return authStore.currentUser?.name.charAt(0).toUpperCase();
});

const handleLogout = () => {
    authStore.logout();
};

const dropdonwClass = computed(() => {
    return authStore.tokenUser ? 'btn btn-ghost btn-circle avatar placeholder' : 'btn btn-ghost btn-circle';
})

onMounted(() => {
    categoryStore.fecthCategory()
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
    <div class="drawer">
        <input type="checkbox" class="drawer-toggle" v-model="isOpen" />
        <div class="drawer-content flex flex-col">
            <div class="bg-base-100 sticky top-0 h-16 bg-opacity-90 backdrop-blur">
                <nav class="navbar w-full">
                    <div class="navbar-start">
                        <div class="flex-none lg:hidden">
                            <label aria-label="open sidebar" class="btn btn-square btn-ghost" @click="toggleMenu">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    class="inline-block h-6 w-6 stroke-current">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>
                        <a class="btn btn-ghost text-xl hover:bg-inherit">Perpustakaan</a>
                    </div>
                    <div class="navbar-center hidden lg:flex sticky top-0 h-16 bg-opacity-90 backdrop-blur">
                        <ul class="menu menu-horizontal lg:shadow-xl lg:rounded-md">
                            <template v-if="authStore.tokenUser">
                                <li>
                                    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
                                </li>
                                <li>
                                    <RouterLink :to="{ name: 'book' }">Book</RouterLink>
                                </li>
                                <li><RouterLink :to="{name: 'borrows'}" >Borrows</RouterLink></li>
                                <li><RouterLink :to="{name: 'history'}">History</RouterLink></li>
                            </template>
                            <template v-else>
                                <li>
                                    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
                                </li>
                                <li>
                                    <RouterLink :to="{ name: 'book' }">Book</RouterLink>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div class="navbar-end" >
                        <div class="hidden xl:flex">
                            <RouterLink v-if="!authStore.tokenUser" :to="{ name: 'login' }" class="btn btn-ghost text-xl">
                                Login
                            </RouterLink>
                            <RouterLink v-if="!authStore.tokenUser" :to="{ name: 'register' }"
                                class="btn btn-ghost text-xl">
                                Register
                            </RouterLink>
                            <template v-else>
                                <div class="dropdown dropdown-end">
                                    <div tabindex="0" role="button" :class="dropdonwClass">
                                        <template v-if="!authStore.tokenUser">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
                                            </svg>
                                        </template>
                                        <template v-else>
                                            <div class="text-gray-900 w-24 rounded-full">
                                                <span class="text-2xl">{{ firstLetter }}</span>
                                            </div>
                                        </template>
                                    </div>
                                    <ul tabindex="0"
                                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                        <template v-if="authStore.tokenUser">
                                            <li>
                                                <RouterLink :to="{name: 'profile'}" class="text-base">Profile</RouterLink>
                                            </li>
                                            <li><button @click="handleLogout" class="text-base">Logout</button></li>
                                        </template>
                                        <template v-else>
                                            <li>
                                                <RouterLink :to="{ name: 'login' }" class="text-base">Login</RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink :to="{ name: 'register' }" class=" text-base">Register</RouterLink>
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                            </template>
                        </div>
                        <div class="xl:hidden block">
                            <div class="dropdown dropdown-end">
                                <div tabindex="0" role="button" :class="dropdonwClass">
                                    <template v-if="!authStore.tokenUser">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
                                        </svg>
                                    </template>
                                    <template v-else>
                                        <div class="text-gray-900 w-24 rounded-full">
                                            <span class="text-2xl">{{ firstLetter }}</span>
                                        </div>
                                    </template>
                                </div>
                                <ul tabindex="0"
                                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <template v-if="authStore.tokenUser">
                                        <li>
                                            <RouterLink :to="{name: 'profile'}" class="text-base">Profile</RouterLink>
                                        </li>
                                        <li><button @click="handleLogout" class="text-base">Logout</button></li>
                                    </template>
                                    <template v-else>
                                        <li>
                                            <RouterLink :to="{ name: 'login' }" class="text-base">Login</RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink :to="{ name: 'register' }" class=" text-base">Register</RouterLink>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="drawer-side z-10" :class="{ 'drawer-open': isOpen }">
            <label @click="toggleMenu" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4 ">
                <template v-if="authStore.tokenUser">
                    <li>
                        <RouterLink  @click="toggleMenu" :to="{ name: 'home' }">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink  @click="toggleMenu" :to="{ name: 'book' }">Book</RouterLink>
                    </li>
                    <li>
                        <details>
                            <summary>Category</summary>
                            <ul>
                                <li v-for="category in categoryStore.categories" :key="category.id">
                                    <RouterLink  @click="toggleMenu" :to="{ name: 'book', params: { category: category.name } }">
                                        {{ category.name }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li><RouterLink  @click="toggleMenu" :to="{name: 'borrows'}" >Borrows</RouterLink></li>
                    <li><RouterLink  @click="toggleMenu" :to="{name: 'history'}">History</RouterLink></li>
                </template>
                <template v-else>
                    <li>
                        <RouterLink  @click="toggleMenu" :to="{ name: 'home' }">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink  @click="toggleMenu" :to="{ name: 'book' }">Book</RouterLink>
                    </li>
                    <li>
                        <details>
                            <summary>Category</summary>
                            <ul>
                                <li v-for="category in categoryStore.categories" :key="category.id">
                                    <RouterLink  @click="toggleMenu" :to="{ name: 'book', params: { category: category.name } }">
                                        {{ category.name }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </details>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>