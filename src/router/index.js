import { createRouter, createWebHistory } from 'vue-router'
// 匯入你的各模組路由設定（目前先留空或匯入基礎頁面）
// import clientRoutes from './client'
import adminRoutes from './admin'

const routes = [
  {
    path: '/',
    name: 'Landing',
    // 指向 views/public 下的 LandingPage.vue
    component: () => import('@/views/public/LandingPage.vue'),
    meta: { showTopIcon: false },
    meta: { showSidebar: true },

  },
  {
    path: '/HomeView',
    name: 'Home',
    component: () => import('@/views/client/HomeView.vue'),
    meta: {
      showTopIcon: true,
      showSidebar: true,
      title: '首頁',
    },
  },
  {
    path: '/DietLog',
    name: 'Diet',
    component: () => import('@/views/client/DietLog.vue'),
    meta: {
      // showHeader: true,
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/views/client/shop/ShopView.vue'),
    meta: {
      // showHeader: true,
      // showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/product/:id',
    name: 'productDetail',
    component: () => import('@/views/client/shop/ProductDetail.vue'),
  },
  {
    path: '/medicine',
    name: 'Medicine',
    component: () => import('@/views/client/MedicineView.vue'),
    meta: {
      // showTopIcon: true,
      // showHeader: true,
      showSidebar: true,
    }
  },
  // --- 後台管理系統 ---
  // 直接展開匯入的 adminRoutes
  adminRoutes,
  {
    path: '/metrics',
    name: 'Metrics',
    component: () => import('@/views/client/Metrics.vue'),
  },
  // (!一定要放在最後一個!)這裡可以預留一個捕捉 404 的路由，避免輸入錯誤路徑時畫面全白
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
