<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

onMounted(() => {
    authStore.getUser();
});

</script>

<template>
    <section class="h-fit pt-[4vh] mb-0 mt-0 mx-[5%] space-y-2">
        <div class="grid grid-cols-1 xl:grid-cols-3 xl:gap-4">
            <div class="col-span-full xl:col-auto space-y-4">
                <div class="card bg-base-100 w-full xl:w-80 shadow-xl">
                    <div class="card-body">
                        <div class="flex flex-row items-center gap-4">
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="" class="size-20 rounded-lg object-cover" />
                            <div class="flex flex-col">
                                <h3 class="text-lg leading-7 font-medium text-gray-900 capitalize">
                                    {{ authStore.currentUser?.username }}
                                </h3>
                                <p class="text-sm text-gray-700">
                                    {{ authStore.currentUser?.email }}
                                </p>
                                <p class="text-sm text-gray-700 flex items-center space-x-2">
                                    <span>Email Verified:</span>
                                    <template v-if="authStore.currentUser?.email_verified_at">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6 text-green-500 shrink-0 stroke-current" fill="none"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </template>
                                    <template v-else>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 shrink-0 stroke-current"
                                            fill="none" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </template>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 w-full xl:w-80 shadow-xl">
                    <div class="card-body">
                        <h3 class="mb-1 m-0 leading-7 text-xl font-semibold">General information</h3>
                        <div class="grid grid-cols-6 gap-2">
                            <div class="col-span-6 sm:col-span-3">
                                <span class="text-sm font-medium text-gray-600">Age</span>
                                <p class="font-bold sm:text-sm">
                                   18
                                </p>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <span class="text-sm font-medium text-gray-600">Address</span>
                                <p class="font-bold sm:text-sm">
                                   Kota Bekasi
                                </p>
                            </div>
                            <div class="col-span-6">
                                <span
                                    class="text-sm font-medium text-gray-900 leading-7">Biodata</span>
                                <p class="text-gray-600 sm:text-sm">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A, ducimus. Vitae
                                    consequuntur sed tempore eligendi non? Velit soluta sed animi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-2">
                <div class="card bg-base-100 w-full shadow-xl">
                    <div class="card-body">
                        <h3 class="mb-1 m-0 leading-7 text-xl font-semibold">History</h3>
                        <!-- <div class="grid grid-cols-6 gap-2">
                            <div class="col-span-6 sm:col-span-3">
                                <span class="text-sm font-medium text-gray-600">Age</span>
                                <p class="font-bold sm:text-sm">
                                   18
                                </p>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <span class="text-sm font-medium text-gray-600">Address</span>
                                <p class="font-bold sm:text-sm">
                                   Kota Bekasi
                                </p>
                            </div>
                            <div class="col-span-6">
                                <span
                                    class="text-sm font-medium text-gray-900 leading-7">Biodata</span>
                                <p class="text-gray-600 sm:text-sm">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A, ducimus. Vitae
                                    consequuntur sed tempore eligendi non? Velit soluta sed animi.
                                </p>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
