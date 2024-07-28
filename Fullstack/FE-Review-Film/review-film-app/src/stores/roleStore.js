import { ref } from "vue";
import { defineStore } from "pinia";
import apiClient from "../services/api";
import { useAuthStore } from "@/stores/authStore";

export const useRoleStore = defineStore("roleStore", () => {
  const authStore = useAuthStore();
  const currentRole = ref(null);
  const roles = ref([]);
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

  const fecthRole = async () => {
    try {
      const { data } = await apiClient.get("/role");
      roles.value = data.data;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        handleErrors(error.response.data.errors);
      }
    }
  };

  const createRole = async (input) => {
    try {
      resetMessages();
      const { name } = input;
      const { data } = await apiClient.post(
        "/role",
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

  const updateRole = async (id, input) => {
    try {
      resetMessages();
      const { data } = await apiClient.post(`/role/${id}?_method=PUT`, input, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`,
        },
      });
      const index = roles.value.findIndex((genre) => genre.id === id);
      if (index !== -1) {
        roles.value[index] = data.data;
      }
      handleSuccess(data.message);
      await fecthGenre();
    } catch (error) {
      console.error("Error respons dari server:", error.response.data); 
      if (error.response && error.response.status === 422) {
        handleErrors(error.response.data.errors);
      }
    }
  };

  const deleteRole = async (id) => {
    try {
      resetMessages();
      const { data } = await apiClient.post(`/genre/${id}?_method=DELETE`, {
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
    roles,
    errors,
    success,
    fecthRole,
    createRole,
    updateRole,
    deleteRole,
    currentRole,
  };
});
