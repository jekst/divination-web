import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, },
    { path: '/liuyao/pan', name: 'liuyaopan', component: () => import('../components/LiuyaoPaipan.vue'), },
    { path: '/liuyao/history', name: 'liuyaohistory', component: () => import('../components/LiuyaoHistory.vue'), },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: HomeView },
  ],
})

export default router
