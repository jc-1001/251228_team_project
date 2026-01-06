import { createRouter, createWebHistory } from 'vue-router'
// 匯入你的各模組路由設定（目前先留空或匯入基礎頁面）
// import clientRoutes from './client'
// import adminRoutes from './admin'

const routes = [
  {
    path: '/',
    name: 'Landing',
    // 指向 views/public 下的 LandingPage.vue
    component: () => import('@/views/public/LandingPage.vue'),
    meta: { showTopIcon: false },
  },
  {
    path: '/HomeView',
    name: 'Home',
    component: () => import('@/views/client/HomeView.vue'),
    meta: { showHeader: true },
    meta: { showTopIcon: true },
  },
  // 這裡可以預留一個捕捉 404 的路由，避免輸入錯誤路徑時畫面全白
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router