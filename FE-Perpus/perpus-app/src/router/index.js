import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useLoadingStore   } from "@/stores/loadingStore";

// owner
import MainOwner from '@/layouts/owner/MainLayouts.vue'
import HomeOwner from '@/views/owner/HomeView.vue'
import CategoryOwner from '@/views/owner/CategoryView.vue'
import ProfileOwner from '@/views/owner/ProfileView.vue'
import RoleOwner from '@/views/owner/RoleVIew.vue'
import BookOwner from '@/views/owner/book/BookView.vue'
import CreateBook from '@/views/owner/book/CreateView.vue'
import EditBook from '@/views/owner/book/EditView.vue'
import DetailBook from '@/views/owner/book/DetailView.vue'
import BorowsOwner from '@/views/owner/BorowsView.vue'
// User
import MainUser from '@/layouts/user/MainLayouts.vue'
import Home from '@/views/user/HomeView.vue'
import Book from '@/views/user/book/BookVIew.vue'
import DetailBookUser from '@/views/user/book/DetailView.vue'
import Borrows from '@/views/user/BorrowsView.vue'
import Profile from '@/views/user/ProfileView.vue'
import History from '@/views/user/HistoryView.vue'

// Authentication
import Login from '@/views/auth/LoginView.vue'
import Register from '@/views/auth/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainUser,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/book/:category?',
          name: 'book',
          component: Book,
        },
        {
          path: 'detail/book/:id',
          name: 'detailBookUser',
          component: DetailBookUser,
        },
        {
          path: 'book/borrows',
          name: 'borrows',
          component: Borrows,
        },
        {
          path: '/profile',
          name: 'profile',
          component: Profile,
        },
        {
          path: '/history',
          name: 'history',
          component: History,
        },
      ]
    },
    {
      path: '/owner',
      component: MainOwner,
      children: [
        {
          path: '/owner',
          name: 'homeOwner',
          component: HomeOwner
        },
        {
          path: '/owner/category',
          name: 'categoryOwner',
          component: CategoryOwner
        },
        {
          path: '/owner/profile',
          name: 'profileOwner',
          component: ProfileOwner,
        },
        {
          path: '/owner/role',
          name: 'roleOwner',
          component: RoleOwner
        },
        {
          path: '/owner/book',
          name: 'bookOwner',
          component: BookOwner
        },
        {
          path: '/owner/create/book',
          name: 'createBook',
          component: CreateBook
        },
        {
          path: '/owner/edit/book/:id',
          name: 'editBook',
          component: EditBook
        },
        {
          path: '/owner/datail/book/:id',
          name: 'detailBook',
          component: DetailBook
        },
        {
          path: '/borrows',
          name: 'borrowsOwner',
          component: BorowsOwner,
        },
      ],
      meta: { requiresOwner: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresGuest: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const loadingStore = useLoadingStore();
  const isAuthenticated = !!authStore.tokenUser
  const isOwner = authStore.currentUser?.role?.name === 'owner'
  loadingStore.showLoader();
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      alert('Hanya bisa diakses yang sudah login')
      return next({ name: 'login' })
    } else if (to.meta.requiresOwner && !isOwner) {
      alert('Akses hanya untuk owner')
      return next({ name: 'home' })
    } else {
      return next()
    }
  } else if (to.meta.requiresGuest && isAuthenticated) {
    alert('Anda sudah login')
    return next({ name: 'home' })
  } else {
    return next()
  }
})

router.afterEach( async () => {
  const loadingStore = useLoadingStore();
  await new Promise(resolve => setTimeout(resolve, 5000));
  loadingStore.hideLoader();
});
export default router
