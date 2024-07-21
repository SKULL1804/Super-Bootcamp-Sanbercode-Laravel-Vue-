<script setup>
import SectionTitle from './section/TitleComponents.vue';

const props = defineProps({
    contacts: {
        type: Array,
        required: true,
    }
});

</script>

<template>
    <!-- Contact -->
    <section
        class="flex flex-col justify-center sm:items-center box-border h-[70vh] sm:h-fit pt-[4vh] mb-0 mt-0 mx-[5%]">
        <SectionTitle title="Get in Touch" subTitle="Contact Me" />

        <div class="card card-compact flex-wrap flex-row bg-base-100  border border-gray-600 my-8 rounded-3xl select-none">
            <div v-for="contact in props.contacts" :key="contact.id" class="card-body sm:flex-row items-center justify-center">
                <!-- Icon -->
                 <a :href="contact.link">
                     <svg class="h-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                         <path
                             :d="contact.icon">
                         </path>
                     </svg>
                 </a>
                <!-- End Icon -->

                <p class="text-lg hidden sm:block">
                    <a :href="contact.link">{{ contact.name }}</a>
                </p>
            </div>
        </div>
    </section>
    <!-- End Contact -->
</template>