<script setup>
import Contact from '../components/ContactComponents.vue';
import ContactSkeleton from '../components/skeleton/ContactSkeleton.vue';
import { ref, onMounted} from 'vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000); // 
});

const contacts = [
    {
        id: 1,
        icon:'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z',
        link: 'mailto:skullratcher@gmail.com',
        name: 'skullratcher@gmail.com',
    },

    {
        id: 2,
        icon: 'M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z',
        link: 'https://www.linkedin.com/in/aiman-abdul-hakim-a42419267/',
        name: 'LinkedIn',
    }
]
</script>

<template>
    <div>
        <ContactSkeleton v-if="isLoading"/>
        <Contact :contacts="contacts" v-else/>
    </div>
</template>