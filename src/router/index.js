import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Landing',
    // 指向 views/public 下的 LandingPage.vue
    component: () => import('@/views/public/LandingPage.vue'),
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
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/product/:id',
    name: 'productDetail',
    component: () => import('@/views/client/shop/ProductDetail.vue'),
    meta: {
      // showHeader: true,
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/cart',
    name: 'cartView',
    component: () => import('@/views/client/shop/CartView.vue'),
    meta: {
      // showHeader: true,
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/checkout',
    name: 'checkoutView',
    component: () => import('@/views/client/shop/CheckoutView.vue'),
    meta: {
      // showHeader: true,
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/medicine',
    name: 'Medicine',
    component: () => import('@/views/client/Medicine/MedicineView.vue'),
    meta: {
      showTopIcon: true,
      // showHeader: true,
      showSidebar: true,
    }
  },
  {
    path: '/metrics',
    name: 'Metrics',
    component: () => import('@/views/client/Metrics.vue'),
    meta: {
      showTopIcon: true,
      // showHeader: true,
      showSidebar: true,
    }

  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/client/profile/ProfileEdit.vue'),
    meta: {
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/mypoint',
    name: 'mypoint',
    component: () => import('@/views/client/profile/MyPoints.vue'),
    meta: {
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    component: () => import('@/views/client/profile/OrderList.vue'),
    meta: {
      showTopIcon: true,
      showSidebar: true,
    }
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
  scrollBehavior(to, from, savedPosition) {
    // 始終滾到最上面
    return { top: 0 }
  },
})

export default router
