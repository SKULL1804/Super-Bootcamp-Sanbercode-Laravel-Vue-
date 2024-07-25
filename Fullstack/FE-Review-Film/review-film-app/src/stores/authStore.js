import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import apiClient from "../services/api";

export const useAuthStore = defineStore("authStore", () => {
  const router = useRouter();
  const tokenUser = ref(localStorage.getItem("token"));
  const currentUser = ref(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const isError = ref(false);
  const errorMsg = ref("");
  const isSuccess = ref(false);
  const successMsg = ref("");

  const handleError = (error) => {
    if (error.response && error.response.data) {
      isError.value = true;
      errorMsg.value = error.response.data.error || "Something went wrong";
    } else {
      isError.value = true;
      errorMsg.value = "Network error or server not responding";
    }
  };

  const handleSuccess = (message) => {
    isSuccess.value = true;
    successMsg.value = message;
  };

  const resetMessages = () => {
    isError.value = false;
    errorMsg.value = "";
    isSuccess.value = false;
    successMsg.value = "";
  };

  const redirectWithDelay = (routeName) => {
    setTimeout(() => {
      router.push({ name: routeName });
    }, 1000);
  };

  const register = async (input) => {
    try {
      resetMessages();
      const { username, email, password, password_confirmation } = input;
      const { data } = await apiClient.post("/auth/register", {
        username,
        email,
        password,
        password_confirmation,
      });

      const { token, user } = data;

      tokenUser.value = token;
      currentUser.value = user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      handleSuccess(data.message);
      redirectWithDelay("login");
    } catch (error) {
      handleError(error);
    }
  };

  const login = async (input) => {
    try {
      resetMessages();
      const { email, password } = input;
      const { data } = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = data;

      tokenUser.value = token;
      currentUser.value = user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      handleSuccess(data.message);
      redirectWithDelay("home");
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenUser.value}`,
          },
        }
      );

      tokenUser.value = null;
      currentUser.value = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      handleSuccess("Logout successful! Redirecting to Home...");
      redirectWithDelay("home");
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await apiClient.get("/me", {
        headers: {
          Authorization: `Bearer ${tokenUser.value}`,
        },
      });

      const { user } = data;
      currentUser.value = user;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      handleError(error);
    }
  };

  const updateUser = async (input) => {
    try {
      resetMessages();
      const dataToSend = {};

      if (input.name) dataToSend.name = input.name;
      if (input.email) dataToSend.email = input.email;
      if (input.password) dataToSend.password = input.password;
      if (input.password_confirmation)
        dataToSend.password_confirmation = input.password_confirmation;

      const { data } = await apiClient.post("/update-users", dataToSend, {
        headers: {
          Authorization: `Bearer ${tokenUser.value}`,
        },
      });

      currentUser.value = data.user;
      localStorage.setItem("user", JSON.stringify(data.user));

      handleSuccess(data.message);
    } catch (error) {
      handleError(error);
    }
  };

  const generateOtp = async () => {
    try {
      resetMessages();

      await apiClient.post("/auth/generate-otp-code", {
        email: currentUser.value.email,
      });

      handleSuccess("OTP generated successfully!");
    } catch (error) {
      handleError(error);
    }
  };

  const verifyAccount = async (otp) => {
    try {
      resetMessages();
      const { data } = await apiClient.post(
        "auth/verifikasi-akun",
        {
          otp: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenUser.value}`,
          },
        }
      );

      currentUser.value = data.data;
      localStorage.setItem("user", JSON.stringify(data.data));

      handleSuccess("Account verification successful!");
      redirectWithDelay("home");
    } catch (error) {
      handleError(error);
    }
  };

  return {
    tokenUser,
    currentUser,
    isError,
    errorMsg,
    isSuccess,
    successMsg,
    register,
    login,
    logout,
    getUser,
    verifyAccount,
    generateOtp,
    updateUser,
  };
});
