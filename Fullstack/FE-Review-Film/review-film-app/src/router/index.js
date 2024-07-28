import { createRouter, createWebHistory } from "vue-router";
// User
import HomeUser from "../views/user/HomeView.vue";
import GenreUser from "../views/user/GenreView.vue";
import FilmUser from "../views/user/FilmView.vue";
import CastUser from "../views/user/CastView.vue";
import MainUser from "../layouts/user/MainLayout.vue";

// Admin
import HomeAdmin from "@/views/admin/HomeView.vue";
/// Genre
import GenreAdmin from "@/views/admin/GenreView.vue";
import DetailGenre from "@/views/admin/genre/DetailView.vue";
// Role 
import RoleAdmin from "@/views/admin/RoleView.vue";
// Movie
import MovieAdmin from "@/views/admin/MovieView.vue";
import CreateMovie from "@/views/admin/movie/CreateView.vue";
import EditMovie from "@/views/admin/movie/EditView.vue";
import DetailMovie from "@/views/admin/movie/DetailView.vue";
// Cast
import CastAdmin from "@/views/admin/CastView.vue";
import CreateCast from "@/views/admin/cast/CreateView.vue";
import EditCast from "@/views/admin/cast/EditView.vue";
import DetailCast from "@/views/admin/cast/DetailView.vue";
import MainAdmin from "@/layouts/admin/MainLayout.vue";
// CastMovie
import CastMovie from "@/views/admin/CastMovieView.vue";
import CreateCastMovie from "@/views/admin/cast-movie/CreateView.vue";
import EditCastMovie from "@/views/admin/cast-movie/EditView.vue";
import DetailCastMovie from "@/views/admin/cast-movie/DetailView.vue";
// Profile
import UpdateProfileView from "@/views/admin/UpdateProfileView.vue";

// Public
import Login from "../views/auth/LoginView.vue";
import Register from "../views/auth/RegisterView.vue";
import VerikasiAkun from "../views/auth/VerikasiAkunView.vue";

// User dan Admin sesuai Auth dan Verifikasi Akun
import Profile from "../views/auth/ProfileView.vue";
import Settings from "../views/auth/SettingView.vue";
import { useAuthStore } from "@/stores/authStore";
import ReviewView from "@/views/admin/ReviewView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainUser,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeUser,
        },
        {
          path: "/genre/:name",
          name: "genre",
          component: GenreUser,
        },
        {
          path: "/film",
          name: "film",
          component: FilmUser,
        },
        {
          path: "/cast",
          name: "cast",
          component: CastUser,
        },
        {
          path: "/profile",
          name: "profile",
          component: Profile,
          meta: { requiresAuth: true, requiresVerification: true },
        },
        {
          path: "/settings",
          name: "settings",
          component: Settings,
          meta: { requiresAuth: true, requiresVerification: true },
        },
      ],
    },

    {
      path: "/admin",
      component: MainAdmin,
      children: [
        {
          path: "",
          name: "admin",
          component: HomeAdmin,
        },
        {
          path: "/admin/genre",
          name: "allGenre",
          component: GenreAdmin,
        },
        {
          path: "/admin/role",
          name: "allRole",
          component: RoleAdmin,
        },
        {
          path: "/admin/detail/genre/:id",
          name: "detailGenre",
          component: DetailGenre,
        },
        {
          path: "/admin/movie",
          name: "allMovie",
          component: MovieAdmin,

        },
        {
          path: "/admin/create/movie",
          name: "createMovie",
          component: CreateMovie,
        },
        {
          path: "/admin/edit/movie/:id",
          name: "editMovie",
          component: EditMovie,
        },
        {
          path: "/admin/detail/movie/:id",
          name: "detailMovie",
          component: DetailMovie,
        },
        {
          path: "/admin/detail/movie/:id",
          name: "detailMovie",
          component: DetailMovie,
        },
        {
          path: "/admin/cast",
          name: "allCast",
          component: CastAdmin,
        },
        {
          path: "/admin/create/cast",
          name: "createCast",
          component: CreateCast,
        },
        {
          path: "/admin/edit/cast/:id",
          name: "editCast",
          component: EditCast,
        },
        {
          path: "/admin/detail/cast/:id",
          name: "detailCast",
          component: DetailCast,
        },
        {
          path: "/admin/cast-movie",
          name: "allCastMovie",
          component: CastMovie,
        },
        {
          path: "/admin/create/cast-movie",
          name: "createCastMovie",
          component: CreateCastMovie,
        },
        {
          path: "/admin/edit/cast-movie/:id",
          name: "editCastMovie",
          component: EditCastMovie,
        },
        {
          path: "/admin/detail/cast-movie/:id",
          name: "detailCastMovie",
          component: DetailCastMovie,
        },
        {
          path: "/admin/profile",
          name: "updateProfile",
          component: UpdateProfileView,
        },
        {
          path: "/admin/review",
          name: "review",
          component: ReviewView,
        }
      ],
      meta: { requiresAdmin: true },
    },

    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { requiresGuest: true },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { requiresGuest: true },
    },
    {
      path: "/verifikasi-akun",
      name: "verifikasi-akun",
      component: VerikasiAkun,
      meta: { requiresAuth: true, requiresNoVerification: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.tokenUser;
  const isVerified = authStore.currentUser?.email_verified_at;
  const isAdmin = authStore.currentUser?.role?.name === "admin";

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      alert("Hanya bisa diakses yang sudah login");
      return next({ name: "login" });
    } else if (to.meta.requiresVerification && !isVerified) {
      alert(
        "Akun anda belum terverifikasi. Harap verifikasi akun terlebih dahulu."
      );
      return next({ name: "verifikasi-akun" });
    } else if (to.meta.requiresNoVerification && isVerified) {
      alert("Akun anda sudah terverifikasi.");
      return next({ name: "home" });
    } else {
      return next();
    }
  } else if (to.meta.requiresGuest && isAuthenticated) {
    alert("Anda sudah login");
    return next({ name: "home" });
  } else if (to.meta.requiresAdmin) {
    if (!isAuthenticated || !isAdmin) {
      alert("Akses hanya untuk admin");
      return next({ name: "home" });
    } else {
      return next();
    }
  } else {
    return next();
  }
});

export default router;
