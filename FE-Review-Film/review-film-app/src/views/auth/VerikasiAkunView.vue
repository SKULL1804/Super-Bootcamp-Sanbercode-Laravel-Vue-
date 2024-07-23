<script setup>

</script>

<template>
    <section class="h-fit pt-[4vh] mb-0 mt-0 mx-[5%]">
        <div class="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-2xl">
            <div class="mb-8">
                <h1 class="text-2xl font-bold mb-1">Verification OTP</h1>
                <p class="text-[15px] text-slate-500">Enter the 6-digit verification otp code that was sent to your email</p>
            </div>
            <form id="otp-form">
                <div class="flex items-center justify-center gap-3">
                    <input type="text"
                        class="input input-bordered w-14 h-14 text-center text-2xl font-extrabold text-slate-900 rounded appearance-none p-4 "
                        maxlength="1" />
                    <input type="text"
                        class="input input-bordered w-14 h-14 text-center text-2xl font-extrabold text-slate-900 rounded appearance-none p-4 "
                        maxlength="1" />
                    <input type="text"
                        class="input input-bordered w-14 h-14 text-center text-2xl font-extrabold text-slate-900 rounded appearance-none p-4 "
                        maxlength="1" />
                    <input type="text"
                        class="input input-bordered w-14 h-14 text-center text-2xl font-extrabold text-slate-900 rounded appearance-none p-4 "
                        maxlength="1" />
                    <input type="text"
                        class="input input-bordered w-14 h-14 text-center text-2xl font-extrabold text-slate-900 rounded appearance-none p-4 "
                        maxlength="1" />
                    <input type="text"
                        class="input input-bordered w-14 h-14 text-center text-2xl font-extrabold text-slate-900 rounded appearance-none p-4 "
                        maxlength="1" />
                </div>
                <div class="max-w-[260px] mx-auto mt-4">
                    <button type="submit"
                        class="w-full btn btn-outline">Verify
                        Account</button>
                </div>
            </form>
            <div class="text-sm text-slate-500 mt-4">Didn't receive code? <a
                    class="font-medium text-gray-500 hover:text-gray-600" href="#">Resend</a></div>
        </div>
    </section>
</template>