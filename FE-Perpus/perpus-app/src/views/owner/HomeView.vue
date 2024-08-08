<script setup>
import { onMounted, computed } from 'vue';
import { useBooksStore } from '@/stores/bookStore';
import { useCategoryStore } from "@/stores/categoryStore";
import { useRoleStore } from "@/stores/roleStore";

const bookStore = useBooksStore();
const categoryStore = useCategoryStore();
const roleStore = useRoleStore();
const totalBook = computed(() => bookStore.totalBook);
const totalCategory = computed(() => categoryStore.totalCategory);
const totalRole = computed(() => roleStore.totalRole)

onMounted(() => {
    bookStore.fetchBook()
    categoryStore.fecthCategory()
    roleStore.fecthRole()
});
</script>

<template>
    <section class="p-4">
        <div class="grid w-full grid-cols-1 gap-4 mt-4 md:grid-cols-3">
            <div class="stats shadow">
                <div class="stat">
                    <div class="stat-title">Total Book</div>
                    <div v-if="bookStore.loading">
                        <span class="loading loading-ring loading-lg"></span>
                    </div>
                    <div v-else class="stat-value">{{ totalBook }}</div>
                </div>
            </div>
            <div class="stats shadow">
                <div class="stat">
                    <div class="stat-title">Total Category</div>
                    <div v-if="categoryStore.loading">
                        <span class="loading loading-ring loading-lg"></span>
                    </div>
                    <div v-else class="stat-value">{{ totalCategory }}</div>
                </div>
            </div>
            <div class="stats shadow">
                <div class="stat">
                    <div class="stat-title">Total Role</div>
                    <div v-if="roleStore.loading">
                        <span class="loading loading-ring loading-lg"></span>
                    </div>
                    <div v-else class="stat-value">{{ totalRole }}</div>
                </div>
            </div>
        </div>
    </section>
</template>