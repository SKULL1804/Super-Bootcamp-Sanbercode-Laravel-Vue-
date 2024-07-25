import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Login from "../views/auth/LoginView.vue";
import Register from "../views/auth/RegisterView.vue";
import VerikasiAkun from "../views/auth/VerikasiAkunView.vue";
import Genre from "../views/GenreView.vue";
import Film from "../views/Film.view.vue";
import Cast from "../views/CastView.vue";
import Main from "../layouts/MainLayout.vue";
import Profile from "../views/auth/ProfileView.vue";
import Settings from "../views/auth/SettingView.vue";
import { useAuthStore } from "@/stores/authStore"; 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Main,
      children: [
        {
          path: "/",
          name: "home",
          component: Home,
        },
        {
          path: "/genre/:name",
          name: "genre",
          component: Genre,
        },
        {
          path: "/film",
          name: "film",
          component: Film,
        },
        {
          path: "/cast",
          name: "cast",
          component: Cast,
        },
        {
          path: "/profile",
          name: "profile",
          component: Profile,
          meta: { requiresAuth: true },
        },
        {
          path: "/settings",
          name: "settings",
          component: Settings,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { requiresGuest: true }
    },
    {
      path: "/verifikasi-akun",
      name: "verifikasi-akun",
      component: VerikasiAkun,
    },
  ],
});

// Route Guard untuk memeriksa autentikasi
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); 
  const isAuthenticated = authStore.currentUser;

  if (to.meta.requiresAuth && !isAuthenticated) {
    alert('Hanya bisa di akses yang sudah login')
    next({ name: "login" });
  } 
  else if (to.meta.requiresGuest && isAuthenticated) {
    alert('Anda sudah login dan register')
    next({ name: "home" }); 
  } else {
    next(); 
  }
});

export default router;
