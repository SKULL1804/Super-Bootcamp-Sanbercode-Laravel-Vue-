<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const otp = ref(['', '', '', '', '', '']);

// Handle input for OTP
const handleInput = (index, event) => {
    const { value } = event.target;

    // Only allow numeric input
    if (/[^0-9]/.test(value)) {
        return;
    }

    otp.value[index] = value;

    // Move focus to the next input field
    if (index < 5 && value) {
        document.querySelectorAll('input')[index + 1].focus();
    }
};

// Handle key down events (e.g., backspace)
const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && !otp.value[index]) {
        document.querySelectorAll('input')[index - 1].focus();
    }
};

// Verify account with OTP
const handleVerifikasi = async (event) => {
    event.preventDefault();
    const otpCode = otp.value.join('');
    await authStore.verifyAccount(otpCode);
};

// Generate OTP (ensure email is available or handled)
const handleGenerate = async () => {
    // Optional: Add logic to handle case where email is needed
    await authStore.generateOtp();
};
</script>

<template>
    <section class="h-fit pt-[4vh] mb-0 mt-0 mx-[5%]">
        <div class="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-2xl">
            <div class="mb-8">
                <h1 class="text-2xl font-bold mb-1">Verification OTP</h1>
                <p class="text-[15px] text-slate-500">
                    Enter the 6-digit verification OTP code that was sent to your email
                </p>
            </div>

            <!-- Error Message -->
            <div v-if="authStore.isError" class="toast toast-top toast-end">
                <div class="alert alert-error">
                    <span class="text-white">{{ authStore.errorMsg }}</span>
                </div>
            </div>

            <!-- Success Message -->
            <div v-if="authStore.isSuccess" class="toast toast-top toast-end">
                <div class="alert alert-success">
                    <span class="text-white">{{ authStore.successMsg }}</span>
                </div>
            </div>

            <form @submit.prevent="handleVerifikasi">
                <div class="flex items-center justify-center gap-3">
                    <input
                        type="text"
                        v-for="(digit, index) in otp"
                        :key="index"
                        :value="digit"
                        @input="handleInput(index, $event)"
                        @keydown="handleKeyDown(index, $event)"
                        class="input input-bordered w-14 h-14 text-center text-2xl font-extrabold text-slate-900 rounded appearance-none p-4"
                        maxlength="1"
                    />
                </div>
                <div class="max-w-[260px] mx-auto mt-4">
                    <button type="submit" class="w-full btn btn-outline">Verify Account</button>
                </div>
            </form>
            <div class="text-sm text-slate-500 mt-4">
                Didn't receive code?
                <button @click="handleGenerate" class="font-medium text-gray-500 hover:text-gray-600">
                    Resend
                </button>
            </div>
        </div>
    </section>
</template>
