export default [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('@/views/client/HomeView.vue') },
      { path: 'diet', name: 'DietLog', component: () => import('@/views/client/DietLog.vue') },
      {
        path: 'medicine',
        name: 'Medicine',
        component: () => import('@/views/client/MedicineView.vue'),
      },
      { path: 'metrics', name: 'Metrics', component: () => import('@/views/client/Metrics.vue') },
      // 商城子模組
      {
        path: 'shop',
        name: 'ShopHome',
        component: () => import('@/views/client/shop/ShopHome.vue'),
      },
      {
        path: 'shop/:id',
        name: 'ProductDetail',
        component: () => import('@/views/client/shop/ProductDetail.vue'),
      },
      { path: 'cart', name: 'Cart', component: () => import('@/views/client/shop/Cart.vue') },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('@/views/client/shop/Checkout.vue'),
      },
      // 個人中心
      {
        path: 'orders',
        name: 'OrderList',
        component: () => import('@/views/client/profile/OrderList.vue'),
      },
      {
        path: 'orders/:id',
        name: 'OrderDetail',
        component: () => import('@/views/client/profile/OrderDetail.vue'),
      },
      {
        path: 'points',
        name: 'MyPoints',
        component: () => import('@/views/client/profile/MyPoints.vue'),
      },
      {
        path: 'profile-edit',
        name: 'ProfileEdit',
        component: () => import('@/views/client/profile/ProfileEdit.vue'),
      },
      { path: 'support', name: 'Support', component: () => import('@/views/client/Support.vue') },
    ],
  },
]
