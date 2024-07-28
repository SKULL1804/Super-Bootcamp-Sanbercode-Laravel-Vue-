import { ref } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/services/api";
import { useAuthStore } from "@/stores/authStore";

export const useCastMovieStore = defineStore("castMovieStore", () => {
  const authStore = useAuthStore();
  const castsMovies = ref([]);
  const currentCastMovie = ref(null);
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

  const fetchCastMovie = async () => {
    try {
      const { data } = await apiClient.get("/cast-movie");
      castsMovies.value = data.data ;
    } catch (error) {
      handleErrors(error);
    }
  };

  const detailCastMovie = async (id) => {
    resetMessages();
    try {
      const { data } = await apiClient.get(`/cast-movie/${id}`);
      currentCastMovie.value = data.data;
    } catch (error) {
      handleErrors(error.response.data.error);
    }
  };

  const createCastMovie = async (input) => {
    try {
      resetMessages();
      const { data } = await apiClient.post("/cast-movie", input, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      handleSuccess(data.message);
      castsMovies.value.push(data.body);
    } catch (error) {
      handleErrors(error.response.data.errors);
    }
  };

  const updateCastMovie = async (id, input) => {
    resetMessages();
    try {
      const { data } = await apiClient.post(
        `/cast-movie/${id}?_method=PUT`,
        input,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      console.log(data);
      handleSuccess(data.message);
      const index = castsMovies.value.findIndex((castMovie) => castMovie.id === id);
      if (index !== -1) {
        castsMovies.value[index] = data.data;
      }
    } catch (error) {
      handleErrors(error.response.data.errors);
    }
  };

  const deleteCastMovie = async (id) => {
    resetMessages();
    try {
      await apiClient.post(`/cast-movie/${id}?_method=DELETE`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      castsMovies.value = castsMovies.value.filter((castMovie) => castMovie.id !== id);
    } catch (error) {
      handleErrors(error.response.data.errors);
    }
  };

  return {
    authStore,
    currentCastMovie,
    castsMovies,
    errors,
    success,
    fetchCastMovie,
    createCastMovie,
    detailCastMovie,
    updateCastMovie,
    deleteCastMovie,
  };
});
