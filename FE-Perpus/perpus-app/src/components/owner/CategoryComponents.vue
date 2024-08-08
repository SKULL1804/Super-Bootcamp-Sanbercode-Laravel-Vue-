<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/categoryStore';
import Modal from './partials/CategoryFormComponents.vue';

const categoryStore = useCategoryStore();

const showModal = ref(false);
const isEdit = ref(false);
const currentCategory = ref({});
const search = ref('');
const currentPage = ref(1); 
const itemsPerPage = ref(5);

const toggleModal = () => {
    showModal.value = !showModal.value;
    if (!showModal.value) {
        currentCategory.value = {};
    }
};

const addCategory = () => {
    isEdit.value = false;
    toggleModal();
};

const editCategory = (category) => {
    currentCategory.value = category;
    isEdit.value = true;
    toggleModal();
};

const handleSubmit = async (input) => {
    try {
        if (isEdit.value) {
            await categoryStore.updateCategory(currentCategory.value.id, input);
        } else {
            await categoryStore.createCategory(input);
        }
        await categoryStore.fecthCategory();
        return true;
    } catch (error) {
        console.error("Error handling submit:", error);
        return false;
    }
};

const deleteCategory = async (id) => {
    try {
        await categoryStore.deleteCategory(id);
        await categoryStore.fecthCategory(); 
    } catch (error) {
        console.error("Error deleting category:", error);
    }
};

const filteredCategories = computed(() => {
    return categoryStore.categories.filter(category =>
        category.name.toLowerCase().includes(search.value.toLowerCase())
    );
});

const paginatedCategories = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return filteredCategories.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
    return Math.ceil(filteredCategories.value.length / itemsPerPage.value);
});

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        categoryStore.fecthCategory(); 
    }
};

onMounted(() => {
    categoryStore.fecthCategory(); 
});
</script>


<template>
    <section class="p-4 pt-6 ">
        <div class="p-4 card shadow-lg sm:flex items-center justify-between lg:mt-1.5 bg-gray-100 rounded-3xl">
            <div class="w-full mb-1">
                <div class="card-body">
                    <div class="mb-4">
                        <div class="flex justify-between items-center">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Category
                            </h1>
                        </div>
                    </div>
                    <div class="items-center justify-between block sm:flex">
                        <div class="flex items-center mb-4 sm:mb-0">
                            <form class="sm:pr-3" action="#" method="GET">
                                <label class="input input-bordered flex items-center gap-2">
                                    <input v-model="search" type="text" class="grow" placeholder="Search" />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        class="h-4 w-4 opacity-70">
                                        <path fill-rule="evenodd"
                                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </label>
                            </form>
                        </div>
                        <button @click="addCategory" class="btn btn-primary text-white rounded-lg" type="button">
                            Add Category
                        </button>
                    </div>
                    <div v-if="categoryStore.loading" class="flex justify-center items-center h-64">
                        <span class="loading loading-infinity loading-lg"></span>
                    </div>
                    <div v-else class="overflow-x-auto">
                        <table class="table table-zebra">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(category, index) in paginatedCategories" :key="category.id">
                                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                    <td>{{ category.name }}</td>
                                    <td class="space-x-2">
                                        <button @click="editCategory(category)"
                                            class="btn btn-primary text-white btn-xs capitalize">edit</button>
                                        <button @click="deleteCategory(category.id)" href="#"
                                            class="btn btn-error text-white btn-xs capitalize">delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="join flex justify-end mt-4">
                            <button class="join-item btn" v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ 'btn-active': page === currentPage }">{{ page }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal :showModal="showModal" :category="currentCategory" :isEdit="isEdit" :toggleModal="toggleModal"
            :handleSubmit="handleSubmit" />
    </section>
</template>
