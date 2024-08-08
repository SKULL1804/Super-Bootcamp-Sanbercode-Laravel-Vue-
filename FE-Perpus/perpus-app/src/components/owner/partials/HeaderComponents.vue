<script setup>
import { inject, computed } from 'vue';
import { RouterLink } from 'vue-router';
const toggleMenu = inject('toggleMenu');
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();
const firstLetter = computed(() => {
  return authStore.currentUser?.name.charAt(0).toUpperCase();
});

const handleLogout = () => {
    authStore.logout();
};
</script>
<template>
  <!-- Navbar -->
  <nav class="navbar">
    <div class="flex-none xl:hidden">
      <label @click="toggleMenu" aria-label="open sidebar" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block h-6 w-6 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
    <div class="flex-1 justify-end gap-2">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar  placeholder">
          <div class="bg-base-content text-neutral-content w-24 rounded-full">
            <span class="text-2xl">{{ firstLetter }}</span>
          </div>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <RouterLink class="text-base" :to="{ name: 'profileOwner' }">Profile</RouterLink>
          </li>
          <li><button class="text-base" @click="handleLogout" >Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>