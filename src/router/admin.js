const adminRoutes = {
    path: '/admin',
    // 指向後台的外殼佈局
    component: () => import('@/layouts/AdminLayout.vue'),
    // 設定 meta，讓 App.vue 知道進入此路徑後要隱藏前台 Sidebar
    meta: { showSidebar: false },
    children: [
        {
            // 1. 數據儀表板 (網址: /admin)
            path: '',
            name: 'AdminDashboard',
            component: () => import('@/views/admin/BackDashboard.vue'),
            meta: { title: '數據儀表板' }
        },

        // --- 使用者管理 ---
        {
            path: 'users',
            children: [
                {
                    // 2. 使用者管理列表 (網址: /admin/users)
                    path: '',
                    name: 'UserList',
                    component: () => import('@/views/admin/users/UserList.vue'),
                    meta: { title: '使用者管理' }
                },
                {
                    // 3. 使用者詳細資訊 (網址: /admin/users/:id)
                    path: ':id',
                    name: 'UserDetail',
                    component: () => import('@/views/admin/users/UserDetail.vue'),
                    props: true,
                    meta: { title: '使用者詳情' }
                }
            ]
        },

        // --- 商品管理 ---
        {
            path: 'products',
            children: [
                {
                    // 4. 商品管理列表 (網址: /admin/products)
                    path: '',
                    name: 'ProductList',
                    component: () => import('@/views/admin/products/ProductList.vue'),
                    meta: { title: '商品管理' }
                },
                {
                    // 5. 編輯/新增商品 (網址: /admin/products/edit/:id?)
                    path: 'edit/:id?',
                    name: 'ProductEdit',
                    component: () => import('@/views/admin/products/ProductEdit.vue'),
                    props: true,
                    meta: { title: '編輯商品' }
                }
            ]
        },

        // --- 訂單管理 ---
        {
            path: 'orders',
            children: [
                {
                    // 6. 訂單管理列表 (網址: /admin/orders)
                    path: '',
                    name: 'OrderList',
                    component: () => import('@/views/admin/orders/OrderList.vue'),
                    meta: { title: '訂單管理' }
                },
                {
                    // 7. 訂單詳細資訊 (網址: /admin/orders/:id)
                    path: ':id',
                    name: 'OrderDetail',
                    component: () => import('@/views/admin/orders/OrderDetail.vue'),
                    props: true,
                    meta: { title: '訂單詳情' }
                }
            ]
        },

        // --- 系統通知管理 ---
        {
            path: 'notices',
            children: [
                {
                    // 8. 系統通知列表 (網址: /admin/notices)
                    path: '',
                    name: 'NoticeList',
                    component: () => import('@/views/admin/notices/NoticeList.vue'),
                    meta: { title: '系統通知管理' }
                },
                {
                    // 9. 編輯/發布通知 (網址: /admin/notices/edit/:id?)
                    path: 'edit/:id?',
                    name: 'NoticeEdit',
                    component: () => import('@/views/admin/notices/NoticeEdit.vue'),
                    props: true,
                    meta: { title: '編輯通知內容' }
                }
            ]
        }
    ]
};

export default adminRoutes;