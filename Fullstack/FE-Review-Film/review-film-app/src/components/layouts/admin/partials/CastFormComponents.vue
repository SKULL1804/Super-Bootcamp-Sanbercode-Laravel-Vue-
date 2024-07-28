<script setup>
import { useCastStore } from '@/stores/castStore';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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

const route = useRoute();
const router = useRouter();

const castStore = useCastStore();

const input = reactive({
    name: "",
    age: "",
    biodata: "",
});

const fetchCastDetails = async () => {
    if (props.isUpdate) {
        try {
            await castStore.detailCast(route.params.id);
            const cast = castStore.currentCast;
            input.name = cast.name;
            input.age = cast.age;
            input.biodata = cast.biodata;
        } catch (error) {
            console.error("Failed to fetch cast details", error);
        }
    }
};

const handleSubmit = async () => {
    const formData = {
        name: input.name,
        age: input.age,
        biodata: input.biodata
    };

    try {
        if (props.isUpdate) {
            await castStore.updateCast(route.params.id, formData);
        } else {
            await castStore.createCast(formData);
        }
        router.push({ name: 'allCast' });
    } catch (error) {
        console.error("Error submitting form", error);
    }
};

onMounted(() => {
    fetchCastDetails();
});
</script>

<template>
    <div class="card-body">
        <div class="mb-4">
            <div class="block space-y-2 sm:space-x-0 justify-between items-center sm:flex">
                <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"> {{ props.title }} Cast
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
                            <span class="label-text">Name</span>
                        </div>
                        <input v-model="input.name" type="text" placeholder="Name"
                            class="input input-bordered w-full" />
                    </label>
                </div>
                <div class="sm:col-span-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Age</span>
                        </div>
                        <input v-model="input.age" type="text" placeholder="Age"
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
                {{ props.isUpdate ? 'Update' : 'Add' }} Cast
            </button>
        </form>
    </div>
</template>
