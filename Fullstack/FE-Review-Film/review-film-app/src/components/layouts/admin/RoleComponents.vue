<script setup>
import { ref, onMounted } from 'vue';
import { useRoleStore } from '@/stores/roleStore';
import Role from './partials/RoleFormComponents.vue';
import { RouterLink } from 'vue-router';

const roleStore = useRoleStore();

const showModal = ref(false);
const isEdit = ref(false);
const currentRole= ref({});

const toggleModal = () => {
    showModal.value = !showModal.value;
    if (!showModal.value) {
        currentRole.value = {};
    }
};

const addRole = () => {
    isEdit.value = false;
    toggleModal();
};

const editRole = (genre) => {
    currentRole.value = genre;
    isEdit.value = true;
    toggleModal();
};

const handleSubmit = async (input) => {
    if (isEdit.value) {
        await roleStore.updateRole(currentRole.value.id, input);
    } else {
        await roleStore.createRole(input);
    }
    if (roleStore.success) {
        toggleModal();
    }
};

const deleteRole = async (id) => {
    try {
        await roleStore.deleteRole(id);
    } catch (error) {
        console.error("Error deleting genre:", error);
    }
};

onMounted(() => {
    roleStore.fecthRole();
});
</script>

<template>
    <section class="p-4 pt-6">
        <div
            class="p-4 card shadow-lg sm:flex items-center justify-between lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div class="w-full mb-1">
                <div class="card-body">
                    <div class="mb-4">
                        <div class="flex justify-between items-center">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Role</h1>
                            <div v-if="roleStore.success" class="alert alert-success w-40">
                                <span class="text-white">{{ roleStore.success }}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                        <div class="flex items-center mb-4 sm:mb-0">
                            <form class="sm:pr-3" action="#" method="GET">
                                <label class="input input-bordered flex items-center gap-2">
                                    <input type="text" class="grow" placeholder="Search" />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                        class="h-4 w-4 opacity-70">
                                        <path fill-rule="evenodd"
                                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </label>
                            </form>
                        </div>
                        <button @click="addRole" class="btn btn-primary text-white rounded-lg" type="button">
                            Add Role
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="table table-zebra">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(role, index) in roleStore.roles" :key="role.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ role.name }}</td>
                                    <td class="space-x-2">
                                        <button @click="editRole(role)"
                                            class="btn btn-primary text-white btn-xs capitalize">edit</button>
                                        <button @click="deleteRole(role.id)" href="#"
                                            class="btn btn-error text-white btn-xs capitalize">delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <Role :showModal="showModal" :role="currentRole" :errors="roleStore.errors" :isEdit="isEdit"
            :toggleModal="toggleModal" :handleSubmit="handleSubmit" />
    </section>
</template>