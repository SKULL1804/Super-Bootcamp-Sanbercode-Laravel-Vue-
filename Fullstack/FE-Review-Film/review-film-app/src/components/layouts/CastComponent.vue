<script setup>
const props = defineProps({
    casts: {
        type:Array,
        required: true
    }
})

</script>

<template>
     <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 cursor-pointer">
         <article v-for="cast in casts" :key="cast.id" class="rounded-xl border-2 border-gray-100 bg-white">
             <div class="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                 <div class="avatar">
                     <div class="w-24 rounded-full">
                         <img :src="cast.avatar" />
                     </div>
                 </div>
     
                 <div>
                     <h3 class="font-medium sm:text-lg">
                         {{ cast.name }}
                     </h3>
     
                     <p class="line-clamp-2 text-sm text-gray-700">
                         {{ cast.description }}
                     </p>
                 </div>
             </div>
         </article>
    </div>
</template>