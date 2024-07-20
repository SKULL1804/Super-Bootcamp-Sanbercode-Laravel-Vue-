<script setup>

</script>

<template>
    <!-- Footer -->
    <footer class="h-[20vh] sm:h-[26vh] mx-4">
        <nav class="flex items-center justify-around h-fit sm:h-[17vh]">
            <ul class="menu menu-horizontal items-center justify-around px-1">
                <li class="hover:text-gray-500"><RouterLink to="/"
                        class="text-base sm:text-2xl font-medium hover:bg-inherit hover:underline underline-offset-8 decoration-gray-500 focus:bg-inherit focus:underline focus:text-gray-500 hover:focus:active:text-gray-500 hover:focus:active:bg-inherit">Home</RouterLink>
                </li>
                <li class="hover:text-gray-500"><RouterLink to="/about"
                        class="text-base sm:text-2xl font-medium hover:bg-inherit hover:underline underline-offset-8 decoration-gray-500 focus:bg-inherit focus:underline focus:text-gray-500 hover:focus:active:text-gray-500 hover:focus:active:bg-inherit">About</RouterLink>
                </li>
                <li class="hover:text-gray-500"><RouterLink to="/skill"
                        class="text-base sm:text-2xl font-medium hover:bg-inherit hover:underline underline-offset-8 decoration-gray-500 focus:bg-inherit focus:underline focus:text-gray-500 hover:focus:active:text-gray-500 hover:focus:active:bg-inherit">Skill</RouterLink>
                </li>
                <li class="hover:text-gray-500"><RouterLink to="/experience"
                        class="text-base sm:text-2xl font-medium hover:bg-inherit hover:underline underline-offset-8 decoration-gray-500 focus:bg-inherit focus:underline focus:text-gray-500 hover:focus:active:text-gray-500 hover:focus:active:bg-inherit">Experience</RouterLink>
                </li>
                <li class="hover:text-gray-500"><RouterLink to="/portofolio"
                        class="text-base sm:text-2xl font-medium hover:bg-inherit hover:underline underline-offset-8 decoration-gray-500 focus:bg-inherit focus:underline focus:text-gray-500 hover:focus:active:text-gray-500 hover:focus:active:bg-inherit">Portofolio</RouterLink>
                </li>
            </ul>
        </nav>
        <aside class="text-center">
            <p>Copyright © 2024 Ratcher. All Rights Reserved.</p>
        </aside>
    </footer>
    <!-- End Footer  -->
</template>