export default [
    {
        path: '/admin',
        component: () => import('@/layouts/AdminLayout.vue'),
        children: [
            { path: '', name: 'AdminDashboard', component: () => import('@/views/admin/BackDashboard.vue') },
            // 用戶管理
            { path: 'users', name: 'AdminUserList', component: () => import('@/views/admin/users/UserList.vue') },
            { path: 'users/:id', name: 'AdminUserDetail', component: () => import('@/views/admin/users/UserDetail.vue') },
            // 商品管理
            { path: 'products', name: 'AdminProductList', component: () => import('@/views/admin/products/ProductList.vue') },
            { path: 'products/edit/:id?', name: 'AdminProductEdit', component: () => import('@/views/admin/products/ProductEdit.vue') },
            // 訂單管理
            { path: 'orders', name: 'AdminOrderList', component: () => import('@/views/admin/orders/OrderList.vue') },
            { path: 'orders/:id', name: 'AdminOrderDetail', component: () => import('@/views/admin/orders/OrderDetail.vue') },
            // 系統通知
            { path: 'notices', name: 'AdminNoticeList', component: () => import('@/views/admin/notices/NoticeList.vue') },
            { path: 'notices/edit/:id?', name: 'AdminNoticeEdit', component: () => import('@/views/admin/notices/NoticeEdit.vue') },

        ]
    }
]