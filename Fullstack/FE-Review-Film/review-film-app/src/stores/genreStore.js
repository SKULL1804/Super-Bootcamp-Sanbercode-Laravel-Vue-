import { ref } from "vue";
import { defineStore } from "pinia";
import apiClient from "../services/api";
import { useAuthStore } from "@/stores/authStore";

export const useGenreStore = defineStore("genreStore", () => {
  const authStore = useAuthStore();
  const currentGenre = ref(null);
  const genres = ref([]);
  const success = ref("");
  const errors = ref({});

  const handleSuccess = (message) => {
    success.value = message;
  };

  const handleErrors = (errorData) => {
    errors.value = errorData;
  };

  const resetMessages = () => {
    errors.value = {};
    success.value = "";
  };

  const fetchGenre = async () => {
    try {
      const { data } = await apiClient.get("/genre");
      genres.value = data.data;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        handleErrors(error.response.data.errors);
      }
    }
  };

  const detailGenre = async (id) => {
    try {
      resetMessages();
      const { data } = await apiClient.get(`/genre/${id}`);
      currentGenre.value = data.data;
    } catch (error) {
      console.error(
        "Error fetching genre details:",
        error.response?.data || error.message
      );
      if (error.response && error.response.status === 422) {
        handleErrors(error.response.data.errors);
      }
    }
  };

  const createGenre = async (input) => {
    try {
      resetMessages();
      const { name } = input;
      const { data } = await apiClient.post(
        "/genre",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.tokenUser}`,
          },
        }
      );

      handleSuccess(data.message);
      await fecthGenre();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        handleErrors(error.response.data.errors);
      }
    }
  };

  const updateGenre = async (id, input) => {
    try {
      resetMessages();
      console.log("Data yang dikirim:", input); // Tambahkan log
      const { data } = await apiClient.post(`/genre/${id}?_method=PUT`, input, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`,
        },
      });
      console.log("Respons dari server:", data); // Tambahkan log
      const index = genres.value.findIndex((genre) => genre.id === id);
      if (index !== -1) {
        genres.value[index] = data.data;
      }
      handleSuccess(data.message);
      await fecthGenre();
    } catch (error) {
      console.error("Error respons dari server:", error.response.data); // Tambahkan log
      if (error.response && error.response.status === 422) {
        handleErrors(error.response.data.errors);
      }
    }
  };

  const deleteGenre = async (id) => {
    try {
      resetMessages();
      const { data } = await apiClient.delete(`/genre/${id}?_method=DELETE`, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`,
        },
      });
      console.log("Respons dari server:", data);
      handleSuccess(data.message);
      await fecthGenre();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        handleErrors(error.response.data.errors);
      }
    }
  };

  return {
    authStore,
    currentGenre,
    genres,
    errors,
    success,
    fetchGenre,
    createGenre,
    updateGenre,
    deleteGenre,
    detailGenre
  };
});
