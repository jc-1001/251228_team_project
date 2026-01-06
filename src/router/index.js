import { createRouter, createWebHistory } from 'vue-router'
// 匯入你的各模組路由設定（目前先留空或匯入基礎頁面）
// import clientRoutes from './client'
// import adminRoutes from './admin'

const routes = [
  {
    path: '/',
    name: 'Landing',
    // 指向你 views/public 下的 LandingPage.vue
    component: () => import('@/views/public/LandingPage.vue')
  },
  {
    path: '/portal',
    name: 'Portal',
    component: () => import('@/views/public/PortalView.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/views/client/shop/ShopView.vue')
  },
  {
    path: '/product/:id',
    name: 'productDetail',
    component: () => import('@/views/client/shop/ProductDetail.vue')
  },
  // (!一定要放在最後一個!)這裡可以預留一個捕捉 404 的路由，避免輸入錯誤路徑時畫面全白
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router