<script setup>
import { RouterLink } from "vue-router";
import { inject } from 'vue';

const isOpen = inject('isOpen');
const toggleMenu = inject('toggleMenu');
</script>

<template>
    <div>
        <aside :class="{ 'hidden': !isOpen }"
            class="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
            aria-label="Sidebar">
            <div
                class="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                    <div class="flex-1 px-3 bg-inherit dark:bg-gray-800">
                        <ul class="pb-2 space-y-2">
                            <li>
                                <RouterLink :to="{ name: 'admin'}"
                                    class="block px-4 py-2 font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    Home
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'allGenre' }"
                                    class="block px-4 py-2 font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    Genre
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'allRole' }"
                                    class="block px-4 py-2 font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    Role
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'allMovie' }"
                                    class="block px-4 py-2 font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                  Movie
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'allCast' }"
                                    class="block px-4 py-2 font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                 Cast
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'allCastMovie' }"
                                    class="block px-4 py-2 font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                 Cast Movie
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'review' }"
                                    class="block px-4 py-2 font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                 Review
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </aside>
        <!-- Overlay -->
        <div v-if="isOpen" @click="toggleMenu" class="fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90"></div>
    </div>
</template>