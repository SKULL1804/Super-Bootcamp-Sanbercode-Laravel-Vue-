<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    showModal: Boolean,
    genre: Object,
    errors: Object,
    isEdit: Boolean,
    toggleModal: Function,
    handleSubmit: Function
});

const input = ref({ name: '' });

watch(() => props.genre, (newGenre) => {
    if (newGenre) {
        input.value = { ...newGenre };
    } else {
        input.value = { name: '' };
    }
});

const submitForm = () => {
    props.handleSubmit(input.value);
};

</script>
<template>
    <dialog class="modal modal-bottom sm:modal-middle bg-slate-900/25" :open="showModal">
        <div class="modal-box">
            <div class="flex items-center justify-between rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ isEdit ? 'Edit Genre' : 'Add Genre' }}
                </h3>
                <button type="button" @click="toggleModal"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
            <form @submit.prevent="submitForm">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Name</span>
                    </div>
                    <input v-model="input.name" type="text" placeholder="Name Genre"
                        class="input input-bordered w-full" />
                    <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name[0] }}</span>
                </label>
                <div class="modal-action">
                    <button class="btn btn-primary" type="submit">
                        {{ isEdit ? 'Update' : 'Add' }}
                    </button>
                </div>
            </form>
        </div>
    </dialog>
</template>
