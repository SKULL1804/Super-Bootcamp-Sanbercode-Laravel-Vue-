import { ref } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/services/api";
import { useAuthStore } from "@/stores/authStore";

export const useMovieStore = defineStore("movieStore", () => {
  const authStore = useAuthStore();
  const movies = ref([]);
  const currentMovie = ref(null);
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
  
  const fetchMovie = async () => {
    try {
      const { data } = await apiClient.get("/movie");
      movies.value = data.data;
    } catch (error) {
      handleErrors(error);
    }
  };

  const detailMovie = async (id) => {
    resetMessages();
    try {
      const {data} = await apiClient.get(`/movie/${id}`);
      currentMovie.value = data.data;
    } catch (error) {
      handleErrors(error.response.data.errors);
    }
  };

  const createMovie = async (movieData) => {
    resetMessages();
    try {
      const { data } = await apiClient.post("/movie", movieData, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      handleSuccess("Movie created successfully");
      movies.value.push(data.body);
    } catch (error) {
      handleErrors(error.response.data.errors);
    }
  };

  const updateMovie = async (id, movieData) => {
    resetMessages();
    try {
      const { data } = await apiClient.post(`/movie/${id}?_method=PUT`, movieData, {
        // Perbaiki endpoint
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      handleSuccess("Movie updated successfully");
      const index = movies.value.findIndex((movie) => movie.id === id);
      if (index !== -1) {
        movies.value[index] = data.body;
      }
    } catch (error) {
      console.error(
        "Error updating movie:",
        error.response?.data || error.message
      );
      handleErrors(error.response?.data?.errors || error.message);
    }
  };

  const deleteMovie = async (id) => {
    resetMessages();
    try {
      await apiClient.delete(`/movie/${id}?_method=DELETE`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      handleSuccess("Movie deleted successfully");
      movies.value = movies.value.filter((movie) => movie.id !== id);
    } catch (error) {
      handleErrors(error.response.data.errors);
    }
  };

  return {
    authStore,
    currentMovie,
    movies,
    errors,
    success,
    fetchMovie,
    createMovie,
    detailMovie,
    updateMovie,
    deleteMovie,
  };
});
