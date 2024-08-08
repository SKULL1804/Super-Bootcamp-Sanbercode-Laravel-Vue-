<script setup>
import { reactive, onMounted } from "vue";
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
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});

const handleSubmit = async () => {
    if (props.title === "Login") {
        await authStore.login(input);
    } else {
        await authStore.register(input);
    }
};

onMounted(() => {
    authStore.resetValidationErrors();
});
</script>

<template>
    <section class="flex flex-col items-center justify-center py-12 mb-0 mt-0 space-y-4">
        <div class="relative rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8">
            <div class="max-w-xl lg:max-w-3xl select-none space-y-4">
                <h1 class="text-2xl text-center font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    {{ title }}
                </h1>

                <form @submit.prevent="handleSubmit" class="grid grid-cols-6 gap-6">
                    <div class="col-span-6" v-if="isInputan">
                        <label class="input input-bordered flex items-center gap-2">
                            <input v-model="input.name" type="text" class="grow" placeholder="Name" />
                        </label>
                        <span v-if="authStore.validationErrors.name" class="text-red-500">{{ authStore.validationErrors.name[0] }}</span>
                    </div>

                    <div class="col-span-6">
                        <label class="input input-bordered flex items-center gap-2">
                            <input v-model="input.email" type="email" class="grow" placeholder="Email" />
                        </label>
                        <span v-if="authStore.validationErrors.email" class="text-red-500">{{ authStore.validationErrors.email[0] }}</span>
                    </div>

                    <div class="col-span-6">
                        <label class="input input-bordered flex items-center gap-2">
                            <input v-model="input.password" type="password" class="grow" placeholder="Masukan Kata Sandi" />
                        </label>
                        <span v-if="authStore.validationErrors.password" class="text-red-500">{{ authStore.validationErrors.password[0] }}</span>
                    </div>

                    <div class="col-span-6" v-if="isInputan">
                        <label class="input input-bordered flex items-center gap-2">
                            <input v-model="input.password_confirmation" name="password_confirmation" type="password" class="grow" placeholder="Confirmed Password" />
                        </label>
                        <span v-if="authStore.validationErrors.password_confirmation" class="text-red-500">{{ authStore.validationErrors.password_confirmation[0] }}</span>
                    </div>

                    <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                        <button type="submit" class="btn btn-outline">
                            {{ props.title }}
                        </button>
                        <div v-if="isInputan">
                            <p class="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                                Already have an account?
                                <RouterLink to="/login" class="text-gray-700 underline dark:text-gray-200">Login</RouterLink>.
                            </p>
                        </div>

                        <div v-else>
                            <p class="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                                Don't have an account?
                                <RouterLink to="/register" class="text-gray-700 underline dark:text-gray-200">Register</RouterLink>.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
