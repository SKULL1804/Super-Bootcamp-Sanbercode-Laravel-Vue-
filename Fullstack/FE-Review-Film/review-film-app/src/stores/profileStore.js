import { ref } from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../services/api'; // Ensure you have this service setup for API calls

export const useProfileStore = defineStore('profileStore', () => {
  const currentUser = ref(null);
  const isError = ref(false);
  const errorMsg = ref('');
  const isSuccess = ref(false);
  const successMsg = ref('');

  const handleError = (error) => {
    if (error.response && error.response.data) {
      isError.value = true;
      errorMsg.value = error.response.data.error || 'Something went wrong';
    } else {
      isError.value = true;
      errorMsg.value = 'Network error or server not responding';
    }
  };

  const handleSuccess = (message) => {
    isSuccess.value = true;
    successMsg.value = message;
  };

  const updateProfile = async (input) => {
    try {
      const response = await apiClient.post('/profile', input); // Adjust endpoint as needed
      currentUser.value = response.data.data;
      handleSuccess('Profile updated successfully');
    } catch (error) {
      handleError(error);
    }
  };

  return {
    currentUser,
    isError,
    errorMsg,
    isSuccess,
    successMsg,
    updateProfile,
  };
});
