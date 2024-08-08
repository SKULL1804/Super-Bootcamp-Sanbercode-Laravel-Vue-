<script setup>
import { inject } from 'vue';
import { RouterLink } from 'vue-router';

const isOpen = inject('isOpen');
const toggleMenu = inject('toggleMenu');

</script>

<template>
    <div class="drawer-side z-40" :class="{ 'drawer-open': isOpen }">
        <label @click="toggleMenu" aria-label="close sidebar" class="drawer-overlay"></label>
        <aside class="bg-base-100 xl:bg-inherit min-h-screen w-72 space-y-2">
            <div class="bg-base-100 xl:bg-inherit sticky top-0 z-20 px-4 py-2">
                <a class="px-2" href="">
                    <span class="font-bold text-2xl">Perpustakaan</span>
                </a>
            </div>
            <ul class="menu w-full">
                <li>
                    <RouterLink @click="toggleMenu" :to="{ name: 'homeOwner' }" exact-active-class="active">Home</RouterLink>
                </li>
                <li>
                    <RouterLink @click="toggleMenu" :to="{ name: 'roleOwner' }" exact-active-class="active">Role</RouterLink>
                </li>
                <li>
                    <RouterLink @click="toggleMenu" :to="{ name: 'categoryOwner' }" exact-active-class="active">Category</RouterLink>
                </li>
                <li>
                    <RouterLink @click="toggleMenu" :to="{ name: 'bookOwner' }" exact-active-class="active">Book</RouterLink>
                </li>
                <li>
                    <RouterLink @click="toggleMenu" :to="{ name: 'borrowsOwner' }" exact-active-class="active">Borrows</RouterLink>
                </li>
            </ul>
        </aside>
    </div>
</template>

