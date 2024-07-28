<script setup>
import { ref } from 'vue';
import { useProfileStore } from '@/stores/profileStore';
import { useRouter } from 'vue-router';

const profileStore = useProfileStore();
const router = useRouter();

const input = ref({
    age: '',
    biodata: '',
    address: '',
});

const initializeForm = () => {
    if (profileStore.currentUser) {
        input.value.age = profileStore.currentUser.age || '';
        input.value.biodata = profileStore.currentUser.biodata || '';
        input.value.address = profileStore.currentUser.address || '';
    }
};

initializeForm();

const handleSubmit = async () => {
    try {
        await profileStore.updateProfile(input.value);
        if (profileStore.isSuccess) {
            router.push({ name: 'updateProfile' }); 
        }
    } catch (error) {
        console.error('Failed to update profile:', error);
    }
};
</script>

<template>
    <section class="p-4 pt-6">
        <div
            class="p-4 card shadow-lg sm:flex items-center justify-between lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div class="w-full mb-1">
                <div class="card-body">
                    <div class="mb-4">
                        <div class="block space-y-2 sm:space-x-0 justify-between items-center sm:flex">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Update Profile
                            </h1>
                            <RouterLink :to="{ name: 'allCast' }" class="btn btn-primary rounded-lg" type="button">
                                Back
                            </RouterLink>
                        </div>
                    </div>
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
                                    <input v-model="input.address" type="text" placeholder="Address"
                                        class="input input-bordered w-full" />
                                </label>
                            </div>
                            <div class="col-span-full">
                                <label class="form-control">
                                    <div class="label">
                                        <span class="label-text">Biodata</span>
                                    </div>
                                    <textarea v-model="input.biodata" class="textarea textarea-bordered h-24"
                                        placeholder="Bio"></textarea>
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn mt-4 sm:mt-6 text-sm bg-primary-700 rounded-lg btn-primary">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
