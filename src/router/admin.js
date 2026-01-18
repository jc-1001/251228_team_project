import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue' // 或者建立一個專門給後台用的 AdminApp.vue
import router from './router/admin.js' // 指向你原本寫好的 admin 路由設定

const routes = [
  
  {
    path: '/Users',
    name: 'Users',
    component: () => import('@/views/admin/Users.vue'),
    // meta: {
    //   showTopIcon: true,
    //   showSidebar: true,
    // },
  },
  {
    path: '/updateUserStatus',
    name: 'updateUserStatus',
    component: () => import('@/views/admin/updateUserStatus.vue'),
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

router.beforeEach(async (to, from) => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} - UniCare`
  }
})


const app = createApp(App)
app.use(router)
app.mount('#app')

export default router

