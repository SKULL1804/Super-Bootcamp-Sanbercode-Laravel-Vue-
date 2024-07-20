<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

const isOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};

const handleScroll = () => {
    if (window.scrollY > 0) {
        isScrolled.value = true;
    } else {
        isScrolled.value = false;
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <nav class="navbar justify-around relative min-h-20 xl:h-[17vh]">
        <div
            :class="['fixed top-0 left-0 right-0 navbar min-h-20 xl:h-[17vh] md:px-20 justify-around transition-all duration-300', isScrolled ? 'bg-base-100 shadow-lg z-10  ' : 'bg-transparent']">
            <RouterLink to="/" class="flex items-center gap-2">
                <img src="@/assets/img/skull.png" alt="Skull" class="w-10 rounded-full hidden md:block">
                <span class="font-semibold text-2xl select-none">Ratcher</span>
            </RouterLink>
            <div class="hidden xl:flex">
                <ul class="menu menu-horizontal px-1">
                    <li class="hover:text-gray-500"><RouterLink to="/"
                            class="text-2xl font-medium hover:bg-inherit hover:underline underline-offset-8 decoration-gray-500 focus:bg-inherit focus:underline focus:text-gray-500 hover:focus:active:text-gray-500 hover:focus:active:bg-inherit">Home</RouterLink>
                    </li>
                    <li class="hover:text-gray-500"><RouterLink to="/about"
                            class="text-2xl font-medium hover:bg-inherit hover:underline underline-offset-8 decoration-gray-500 focus:bg-inherit focus:underline focus:text-gray-500 hover:focus:active:text-gray-500 hover:focus:active:bg-inherit">About</RouterLink>
                    </li>
                    <li class="hover:text-gray-500"><RouterLink to="/skill"
                            class="text-2xl font-medium hover:bg-inherit hover:underline underline-offset-8 decoration-gray-500 focus:bg-inherit focus:underline focus:text-gray-500 hover:focus:active:text-gray-500 hover:focus:active:bg-inherit">Skills</RouterLink>
                    </li>
                    <li class="hover:text-gray-500"><RouterLink to="/experience"
                            class="text-2xl font-medium hover:bg-inherit hover:underline underline-offset-8 decoration-gray-500 focus:bg-inherit focus:underline focus:text-gray-500 hover:focus:active:text-gray-500 hover:focus:active:bg-inherit">Experience</RouterLink>
                    </li>
                    <li class="hover:text-gray-500"><RouterLink to="/portofolio"
                            class="text-2xl font-medium hover:bg-inherit hover:underline underline-offset-8 decoration-gray-500 focus:bg-inherit focus:underline focus:text-gray-500 hover:focus:active:text-gray-500 hover:focus:active:bg-inherit">Portofolio</RouterLink>
                    </li>
                    
                </ul>
            </div>
            <div class="xl:hidden flex items-center">
                <button @click="toggleMenu" class="btn btn-ghost xl:hidden">
                    <template v-if="!isOpen">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-8 w-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </template>
                    <template v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            class="inline-block h-8 w-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </template>
                </button>
            </div>
            <div class="hidden xl:flex">
                <RouterLink to="/contact"
                    class="btn btn-ghost text-xl hover:bg-inherit hover:underline underline-offset-8 decoration-gray-500 hover:text-gray-500">Contact
                    Me</RouterLink>
            </div>
        </div>
        <div v-if="isOpen" class="fixed z-10 top-14 left-4 right-4 xl:hidden">
            <ul
                class="menu menu-sm bg-base-100/90  rounded-box z-[1] my-10 shadow-xl w-screen h-[70vh] sm:h-[40vh]">
                <li class="hover:text-gray-500"><RouterLink to="/"
                        class="text-xl font-light hover:bg-gray-50 focus:bg-gray-50 hover:focus:active:text-gray-50 hover:focus:active:bg-gray-600">Home</RouterLink>
                </li>
                <li class="hover:text-gray-500"><RouterLink to="/about"
                        class="text-xl font-light hover:bg-gray-50 focus:bg-gray-50 hover:focus:active:text-gray-50 hover:focus:active:bg-gray-600">About</RouterLink>
                </li>
                <li class="hover:text-gray-500"><RouterLink to="/skill"
                        class="text-xl font-light hover:bg-gray-50 focus:bg-gray-50 hover:focus:active:text-gray-50 hover:focus:active:bg-gray-600">Skill</RouterLink>
                </li>
                <li class="hover:text-gray-500"><RouterLink to="/portofolio"
                        class="text-xl font-light hover:bg-gray-50 focus:bg-gray-50 hover:focus:active:text-gray-50 hover:focus:active:bg-gray-600">Portofolio</RouterLink>
                </li>
                <li class="hover:text-gray-500"><RouterLink to="/experience"
                        class="text-xl font-light hover:bg-gray-50 focus:bg-gray-50 hover:focus:active:text-gray-50 hover:focus:active:bg-gray-600">Experience</RouterLink>
                </li>
                <li class="hover:text-gray-500"><RouterLink to="/contact"
                        class="text-xl font-light hover:bg-gray-50 focus:bg-gray-50 hover:focus:active:text-gray-50 hover:focus:active:bg-gray-600">Contact
                        Me</RouterLink></li>
            </ul>
        </div>
    </nav>
</template>