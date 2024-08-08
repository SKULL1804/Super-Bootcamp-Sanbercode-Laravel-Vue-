import { ref } from 'vue';
import { defineStore } from 'pinia';
import apiClient from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'vue3-toastify';

export const useProfileStore = defineStore('profileStore', () => {
  const authStore = useAuthStore();
  const profile = ref(null);

  const updateProfile = async (input) => {
    try {
      const { data } = await apiClient.post('/profile', input, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`
        }
      });
      
      profile.value = data.data;
      toast.success('Profil berhasil diperbarui.', {
        theme: 'colored',
        pauseOnHover: false,
        autoClose: 2000
      });
    } catch (error) {
      console.error('Gagal memperbarui profil:', error);
      toast.error('Gagal memperbarui profil.', {
        theme: 'colored',
        pauseOnHover: false,
        autoClose: 2000
      });
    }
  };

  return {
    authStore,
    profile,
    updateProfile
  };
});
