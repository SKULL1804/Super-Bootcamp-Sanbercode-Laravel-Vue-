<script setup>
import { reactive } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    isInputan: {
        type: Boolean,
        default: false
    }
});

const authStore = useAuthStore();

const input = reactive({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
})

const handleAuth = async () => {
    if (props.title === "Login") {
        await authStore.login(input);
    } else {
        await authStore.register(input);
    }
}

</script>

<template>
    <section class="flex flex-col items-center justify-center h-fit py-24 mb-0 mt-0 mx-[5%] space-y-4">
        <div class="relative rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8">
            <div class="max-w-xl lg:max-w-3xl select-none space-y-4">
                <h1 class="text-2xl text-center font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    {{ title }}
                </h1>

                <!-- Error Message -->
                <div  v-if="authStore.isError" class="toast toast-top toast-end">
                    <div class="alert alert-error">
                        <span class="text-white" >{{ authStore.errorMsg }}</span>
                    </div>
                </div>
                
                 <!-- Success Message -->
                <div v-if="authStore.isSuccess" class="toast toast-top toast-end">
                    <div class="alert alert-success">
                        <span class="text-white" >{{ authStore.successMsg }}</span>
                    </div>
                </div>
               
                <form @submit.prevent="handleAuth" class="grid grid-cols-6 gap-6">
                    <div class="col-span-6" v-if="isInputan">
                        <label class="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input v-model="input.username" type="text" class="grow" placeholder="Username" />
                        </label>
                    </div>

                    <div class="col-span-6">
                        <label class="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input v-model="input.email" type="email" class="grow" placeholder="Email" />
                        </label>
                    </div>

                    <div class="col-span-6">
                        <label class="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input v-model="input.password" type="password" class="grow"
                                placeholder="Masukan Kata Sandi" />
                        </label>
                    </div>

                    <div class="col-span-6" v-if="isInputan">
                        <label class="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="h-4 w-4 opacity-70">
                                <path fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input v-model="input.password_confirmation" name="password_confirmation" type="password"
                                class="grow" placeholder="Confirmed Password" />
                        </label>
                    </div>

                    <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                        <button type="submit" class="btn btn-outline">
                            {{ props.title }}
                        </button>
                        <div v-if="isInputan">
                            <p class="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                                Already have an account?
                                <RouterLink to="/login" class="text-gray-700 underline dark:text-gray-200">Login
                                </RouterLink>.
                            </p>
                        </div>

                        <div v-else>
                            <p class="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                                Don't have an account?
                                <RouterLink to="/register" class="text-gray-700 underline dark:text-gray-200">Register
                                </RouterLink>.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
