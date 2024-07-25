<script setup>
import { reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const formData = reactive({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
});

onMounted(() => {
    authStore.getUser().then(() => {
        formData.username = authStore.currentUser.username || '';
        formData.email = authStore.currentUser.email || '';
    });
});

const handleUpdate = async () => {
    const dataToUpdate = {
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
    };

    if (formData.email !== authStore.currentUser.email) {
        dataToUpdate.email = formData.email;
    }

    await authStore.updateUser(formData);
};
</script>


<template>
    <section class="h-fit pt-[4vh] mb-0 mt-0 mx-[5%] space-y-2">
        <div class="grid grid-cols-1 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900 space-y-4 xl:space-y-0">
            <div class="col-span-full">
                <div class="card bg-base-100 w-full shadow-xl">
                    <div class="card-body">
                        <!-- Error Message -->
                        <div v-if="authStore.isError" class="alert alert-error">
                            <span class="text-white">{{ authStore.errorMsg }}</span>
                        </div>

                        <!-- Success Message -->
                        <div v-if="authStore.isSuccess" class="alert alert-success">
                            <span class="text-white">{{ authStore.successMsg }}</span>
                        </div>
                        <form @submit.prevent="handleUpdate" class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 md:col-span-3 space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div class="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        class="h-4 w-4 opacity-70">
                                        <path
                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input v-model="formData.username" type="text" class="grow"
                                        placeholder="Username" />
                                </div>
                            </div>
                            <div class="col-span-6 md:col-span-3 space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div class="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        class="h-4 w-4 opacity-70">
                                        <path
                                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path
                                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input v-model="formData.email" type="text" class="grow" placeholder="Email" />
                                </div>
                            </div>
                            <div class="col-span-6 md:col-span-3 space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div class="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        class="h-4 w-4 opacity-70">
                                        <path d="M4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 8a8 8 0 1 1 16 0H2Z" />
                                    </svg>
                                    <input v-model="formData.password" type="password" class="grow"
                                        placeholder="Password" />
                                </div>
                            </div>
                            <div class="col-span-6 md:col-span-3 space-y-2">
                                <label class="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div class="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        class="h-4 w-4 opacity-70">
                                        <path d="M4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 8a8 8 0 1 1 16 0H2Z" />
                                    </svg>
                                    <input v-model="formData.password_confirmation" type="password" class="grow"
                                        placeholder="Confirm Password" />
                                </div>
                            </div>
                            <div class="col-span-6">
                                <div class="card-actions justify-end">
                                    <button type="submit" class="btn btn-outline">Update Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
