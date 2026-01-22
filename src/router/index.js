import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/Portal',
      name: 'Portal',
      component: () => import('@/views/public/PortalView.vue'),
      meta: {
        title: '入口',
      }
    },
  {
    path: '/support',
    name: 'support',
    component: () => import('@/views/client/Support.vue'),
    meta: {
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/public/LoginView.vue'),
  },
  {
    path: '/Landing',
    name: 'Landing',
    // 指向 views/public 下的 LandingPage.vue
    component: () => import('@/views/public/LandingPage.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/client/HomeView.vue'),
    meta: {
      showTopIcon: true,
      showSidebar: true,
      title: '首頁戰情室',
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
      title: '飲食日記',
    }
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/views/client/shop/ShopView.vue'),
    meta: {
      title: '樂活商城',
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/product/:id',
    name: 'productDetail',
    component: () => import('@/views/client/shop/ProductDetail.vue'),
    meta: {
      title: '商品詳情',
      showTopIcon: true,
      showSidebar: true,
    },
  },
  {
    path: '/cart',
    name: 'cartView',
    component: () => import('@/views/client/shop/CartView.vue'),
    meta: {
      title: '購物車',
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/checkout',
    name: 'checkoutView',
    component: () => import('@/views/client/shop/CheckoutView.vue'),
    meta: {
      title: '結帳',
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
      title: '數位藥箱',
    }
  },
  {
    path: '/metrics',
    name: 'Metrics',
    component: () => import('@/views/client/Metrics.vue'),
    meta: {
      showTopIcon: true,
      showSidebar: true,
      title: '身體數值中心',
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
    name: 'orderList',
    component: () => import('@/views/client/profile/OrderList.vue'),
    meta: {
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: `/order/:id`,
    name: 'orderDetail',
    component: () => import('@/views/client/profile/OrderDetail.vue'),
    meta: {
      showTopIcon: true,
      showSidebar: true,
    }
  },
  {
    path: '/loginTest',
    name: 'LoginView_B',
    component: () => import('@/views/public/LoginView_B.vue'),
    meta: {
      title: 'LoginView_B',
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
// 動態變更網頁頁籤
router.beforeEach(async (to, from) => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} - UniCare`
  }
})

export default router
