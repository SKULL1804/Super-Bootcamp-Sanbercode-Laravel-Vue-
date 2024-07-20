import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import About from '@/views/AboutView.vue';
import Experience from '@/views/ExperienceView.vue';
import Portofolio from '@/views/PortofolioView.vue';
import Skill from '@/views/SkillView.vue';
import Contact from '@/views/ContactView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home | Ratcher'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: 'About | Ratcher'
      }
    },
    {
      path: '/skill',
      name: 'skill',
      component: Skill,
      meta: {
        title: 'Skill | Ratcher'
      }
    },
    {
      path: '/experience',
      name: 'experience',
      component: Experience,
      meta: {
        title: 'Experience | Ratcher'
      }
    },
    {
      path: '/portofolio',
      name: 'portofolio',
      component: Portofolio,
      meta: {
        Portofolio: 'Experience | Ratcher'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        Contact: 'Experience | Ratcher'
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title =  to.meta.title || 'Ratcher';
  next()
})

export default router