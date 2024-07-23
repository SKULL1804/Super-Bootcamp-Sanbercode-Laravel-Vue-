import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/auth/LoginView.vue';
import Regsiter from '../views/auth/RegisterView.vue';
import VerikasiAkun from '../views/auth/VerikasiAkunView.vue';
import Genre from '../views/GenreView.vue';
import Film from '../views/Film.view.vue';
import Cast from '../views/CastView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/genre/:name',
      name: 'genre',
      component: Genre
    },
    {
      path: '/film',
      name: 'film',
      component: Film
    },
    {
      path: '/cast',
      name: 'cast',
      component: Cast
    },
    
    // Auth
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Regsiter
    },
    {
      path: '/verifikasi-akun',
      name: 'verifikasi-akun',
      component: VerikasiAkun
    },
  ]
});

export default router
