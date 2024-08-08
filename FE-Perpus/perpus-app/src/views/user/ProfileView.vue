<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useProfileStore } from '@/stores/profileStore';

const authStore = useAuthStore();
const profileStore = useProfileStore();

const input = ref({
    age: '',
    biodata: '',
});

const firstLetter = computed(() => {
    return authStore.currentUser?.name.charAt(0).toUpperCase();
});

const handleSubmit = async () => {
    try {
        await profileStore.updateProfile(input.value);
    } catch (error) {
        console.error('Gagal memperbarui profil:', error);
    }
};

onMounted(async () => {
    await authStore.me();
    if (authStore.currentUser && authStore.currentUser.profile) {
        input.value.age = authStore.currentUser.profile.age || '';
        input.value.biodata = authStore.currentUser.profile.biodata || '';
    }
});
</script>

<template>
    <section class="mx-5 xl:mx-0 my-10">
        <div class="grid grid-cols-1 xl:grid-cols-3 xl:gap-4">
            <div class="col-span-full xl:col-auto">
                <div class="flex flex-col bg-base-100 w-full xl:w-80 shadow-xl">
                    <div class="card-body space-y-4">
                        <div class="flex flex-row items-center gap-4">
                            <div class="avatar placeholder">
                                <div class="bg-neutral text-neutral-content w-24 rounded-full">
                                    <span class="text-3xl">{{ firstLetter }}</span>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <h3 class="text-lg leading-7 font-medium text-gray-900 capitalize">
                                    {{ authStore.currentUser?.name }}
                                </h3>
                                <p class="text-sm text-gray-700">
                                    {{ authStore.currentUser?.email }}
                                </p>
                            </div>
                        </div>

                        <div class="grid grid-cols-6 gap-2">
                            <div class="col-span-6 sm:col-span-3">
                                <span class="text-sm font-medium text-gray-600">Age</span>
                                <p class="font-bold sm:text-sm">
                                    {{ input.age }}
                                </p>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <span class="text-sm font-medium text-gray-600">Address</span>
                                <p class="font-bold sm:text-sm">
                                    {{ input.biodata }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-2">
                <div class="flex flex-col bg-base-100 w-full shadow-xl">
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit">
                            <div class="grid gap-4 sm:grid-cols-6 sm:gap-6">
                                <div class="sm:col-span-3">
                                    <label class="form-control w-full">
                                        <div class="label">
                                            <span class="label-text">Age</span>
                                        </div>
                                        <input v-model="input.age" type="text" placeholder="Age"
                                            class="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div class="sm:col-span-3">
                                    <label class="form-control w-full">
                                        <div class="label">
                                            <span class="label-text">Address</span>
                                        </div>
                                        <input v-model="input.biodata" type="text" placeholder="Address"
                                            class="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>
                            <button type="submit"
                                class="btn text-white mt-4 sm:mt-6 text-sm bg-primary-700 rounded-lg btn-primary">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
