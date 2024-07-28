import { ref } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/services/api";
import { useAuthStore } from "@/stores/authStore";

export const useCastStore = defineStore("castStore", () => {
  const authStore = useAuthStore();
  const casts = ref([]);
  const currentCast = ref(null);
  const errors = ref({});
  const success = ref("");

  const handleErrors = (errorData) => {
    errors.value = errorData;
  };

  const handleSuccess = (message) => {
    success.value = message;
  };

  const resetMessages = () => {
    errors.value = {};
    success.value = "";
  };

  const fetcCast = async () => {
    try {
      const { data } = await apiClient.get("/cast");
      casts.value = data.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  const detailCast = async (id) => {
    resetMessages();
    try {
      const { data } = await apiClient.get(`/cast/${id}`);
      currentCast.value = data.data;
      console.log(data.data);
    } catch (error) {
      handleErrors(error.response.data.errors);
    }
  };

  const createCast = async (input) => {
      try {
        resetMessages();
      const { data } = await apiClient.post("/cast", input, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      handleSuccess(data.message);
      casts.value.push(data.body);
    } catch (error) {
      handleErrors(error.response.data.errors);
    }
  };

  const updateCast = async (id, input) => {
    resetMessages();
    try {
      const { data } = await apiClient.post(
        `/cast/${id}?_method=PUT`,
        input,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      handleSuccess(data.message);
      const index = casts.value.findIndex((cast) => cast.id === id);
      if (index !== -1) {
        casts.value[index] = data.body;
      }
    } catch (error) {
      handleErrors(error.response.data.errors);
    }
  };

  const deleteCast = async (id) => {
    resetMessages();
    try {
      await apiClient.post(`/cast/${id}?_method=DELETE`, null, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      casts.value = casts.value.filter((cast) => cast.id !== id);
    } catch (error) {
      handleErrors(error.response.data.errors);
    }
  };

  return {
    authStore,
    currentCast,
    casts,
    errors,
    success,
    fetcCast,
    createCast,
    detailCast,
    updateCast,
    deleteCast,
  };
});
