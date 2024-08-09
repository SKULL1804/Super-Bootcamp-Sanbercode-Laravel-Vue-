<script setup>
import apiClient from '@/services/api';
import { ref, onMounted, reactive } from 'vue';
import { useBooksStore } from "@/stores/bookStore";
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify'

const bookStore = useBooksStore();
const categories = ref([]);
const route = useRoute();
const router = useRouter();

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    isUpdate: {
        type: Boolean,
        default: false
    },
});

const input = reactive({
    title: "",
    category_id: "",
    stok: "",
    image: null,
    summary: ""
});

const fetchCateggory = async () => {
    const { data } = await apiClient.get('/category');
    categories.value = data.data
}

const fetchBook = async () => {
    try {
        const { data } = await apiClient.get(`/book/${route.params.id}`);
        const book = data.data;
        input.title = book.title;
        input.stok = book.stok;
        input.category_id = book.category_id;
        input.summary = book.summary;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            const errorMsg = error.response.data.error
            toast.error(errorMsg, {
                theme: 'colored',
                pauseOnHover: false
            })
        }
    }
};

const handleUpload = (event) => {
    const selectImage = event.target.files[0];
    input.image = selectImage;
};

const handleSubmit = async () => {
    const form = new FormData();
    form.append("title", input.title);
    form.append("category_id", input.category_id);
    form.append("stok", input.stok);
    if (input.image) {
        form.append("image", input.image);
    }
    form.append("summary", input.summary);

    try {
        if (props.isUpdate) {
            await bookStore.updateBook(route.params.id, form);
        } else {
            await bookStore.createBook(form);
        }
        setTimeout(() => {
            router.push({ name: 'bookOwner' })
        }, 2000)
    } catch (error) {
        if (error.response && error.response.status === 422) {
            const errorMsg = error.response.data.error
            toast.error(errorMsg, {
                theme: 'colored',
                pauseOnHover: false
            })
        }
    }
}

onMounted(() => {
    fetchCateggory();
    if (props.isUpdate) {
        fetchBook();
    }
});
</script>

<template>
    <div class="card-body sm:p-8 p-4">
        <div class="mb-4">
            <div class="block space-y-2 sm:space-x-0 justify-between items-center sm:flex">
                <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"> {{ props.title }} Book
                </h1>
                <RouterLink :to="{ name: 'bookOwner' }" class="btn btn-primary text-white rounded-lg">
                    Back
                </RouterLink>
            </div>
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="grid gap-4 sm:grid-cols-6 sm:gap-6">
                <div class="col-span-full sm:col-span-2">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Judul</span>
                        </div>
                        <input v-model="input.title" type="text" placeholder="Judul"
                            class="input input-bordered w-full" />
                    </label>
                </div>
                <div class="col-span-full sm:col-span-1">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Stok</span>
                        </div>
                        <input v-model="input.stok" type="text" placeholder="Stok"
                            class="input input-bordered w-full" />
                    </label>
                </div>
                <div class="col-span-full sm:col-span-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Category</span>
                        </div>
                        <select v-model="input.category_id" class="select select-bordered">
                            <option disabled selected value="">Pilih Category</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </label>
                </div>

                <div class="col-span-full">
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Cover Book</span>
                        </div>
                        <input @change="handleUpload" type="file"
                            class="file-input file-input-bordered  file-input-primary w-full" />
                    </label>
                </div>
                <div class="col-span-full">
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Description</span>
                        </div>
                        <textarea v-model="input.summary" class="textarea textarea-bordered h-24"
                            placeholder="Description"></textarea>
                    </label>
                </div>
            </div>
            <button type="submit" class="btn mt-4 sm:mt-6 text-sm bg-primary-700 rounded-lg btn-primary text-white">
                {{ props.isUpdate ? 'Update' : 'Add' }}
            </button>
        </form>
    </div>
</template>