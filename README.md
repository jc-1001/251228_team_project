src/
├── api/ # API 請求層 (依模組與權限分組)
│ ├── auth.js # 登入、註冊、權限校驗
│ ├── client/ # 前台 13 頁 API (如: fetchDietLog, addToCart)
│ ├── admin/ # 後台 11 頁 API (如: updateUserStatus, uploadProduct)
│ └── public.js # Landing Page 聯絡表單、公用數據
├── assets/
│ ├── images/ # 靜態圖片
│ │ ├── public/ # Landing Page 用的形象大圖、Hero Banner
│ │ ├── client/ # 前台系統圖標 (如：飲食類別 Icon、藥盒圖)
│ │ ├── admin/ # 後台專用圖標 (如：數據分析插圖 icon)
│ │ └── common/ # 全站共用 (Logo, 預設頭像, 404圖片)
│ ├── icons/ # 存放所有原始 .svg 檔案
│ └── styles/ # 樣式管理
│ ├── \_variables.scss # 顏色與斷點變數
│ ├── \_mixins.scss # 常用 CSS 技巧 (如: 垂直置中)
│ ├── \_base.scss # 基礎重置：Reset CSS、全域標籤樣式
│ ├── \_layouts.scss # 外殼樣式：MainLayout 與 AdminLayout 的框架佈局
│ ├── \_components.scss# 跨頁面小組件樣式
│ ├── \_rwd.scss # 針對手機/平板的共用微調
│ └── main.scss # 入口 CSS (匯總以上所有檔案)
├── components/ # 組件封裝層 (依複用性分層)
│ ├── common/ # 【全站通用】前後台皆可呼叫
│ │ ├── icons/
│ │ │ └── SvgIcon.vue # 全域 SVG 圖標組件
│ │ ├── charts/ # --- 大量圖表組件 ---
│ │ │ ├── BaseChart.vue # 封裝 ECharts/Chart.js 基礎(含 RWD Resize)
│ │ │ ├── VitalsChart.vue # 身體數據折線圖 (前後台共用)
│ │ │ └── RatioChart.vue # 飲食比例圓餅圖
│ │ └── modals/ # --- 全站共用燈箱 ---
│ │ └── ConfirmBox.vue # 全域確認彈窗 (如: 確定刪除嗎?)
│ ├── client/ # 【前台專屬使用組件】(如: 飲食卡片、藥盒零件...)
│ │ └── modals/ # 【前台專屬燈箱】
│ └── admin/ # 【後台專屬使用組件】(如: 管理表格、數據看板卡片)
│
├── data                  # 用來放物件資料，在還沒串資料庫前，用於前台資料展示
│
│
├── hooks/ # 組合式邏輯 (Composition API)
│ ├── useBreakpoint.js # 監控手機/平板/桌面 RWD 狀態
│ └── useChart.js # 封裝圖表初始化與銷毀邏輯
├── layouts/ # 佈局外殼 (決定頁面框架)
│ ├── PublicLayout.vue # Landing & Portal 用的輕量佈局 (無側邊欄)
│ ├── MainLayout.vue # 前台系統佈局 (含 Navbar, Footer)
│ └── AdminLayout.vue # 後台系統佈局 (含 Sidebar, Breadcrumbs)
├── router/ # 路由設定
│ ├── index.js # 主控台 (含 beforeEach 權限守衛)
│ ├── public.js # 導航: Landing, Portal, Auth
│ ├── client.js # 導航: 前台 13 個功能頁路徑
│ └── admin.js # 導航: 後台 11 個管理頁路徑
├── stores/ # Pinia 狀態管理
│ ├── user.js # 用戶角色(Admin/User)、Token、積分
│ ├── cart.js # 購物車列表、總金額計算
│ └── ui.js # 全域燈箱狀態、RWD 選單開關
├── views/ # 頁面入口 (View 組件)
│ ├── public/ # --- 公共/訪客區 (不需權限) ---
│ │ ├── LandingPage.vue # 頁 1: 產品功能介紹
│ │ ├── PortalView.vue # 頁 2: 入口選擇頁 (前/後台大按鈕)
│ │ └── LoginView.vue # 前台登入/註冊頁
│ ├── client/ # --- 前台系統 (13 個獨立頁面) ---
│ │ ├── HomeView.vue # 1. 首頁 (戰情室)
│ │ ├── DietLog.vue # 2. 飲食日記
│ │ ├── Medicine.vue # 3. 數位藥箱
│ │ ├── Metrics.vue # 4. 身體數值中心
│ │ ├── shop/ # --- 商城子模組 ---
│ │ │ ├── ShopHome.vue# 5. 商城首頁
│ │ │ ├── ProductDetail.vue # 6. 商品內頁
│ │ │ ├── Cart.vue # 7. 購物車
│ │ │ └── Checkout.vue# 8. 結帳頁面
│ │ ├── profile/ # --- 個人中心子模組 ---
│ │ │ ├── OrderList.vue # 9. 訂單列表
│ │ │ ├── OrderDetail.vue # 10. 訂單詳情
│ │ │ ├── MyPoints.vue # 11. 我的積分
│ │ │ └── ProfileEdit.vue # 12. 個人資料
│ │ └── Support.vue # 13. 幫助中心
│ └── admin/ # --- 後台管理 (11 個獨立頁面) ---
│ ├── LoginView.vue # 後台登入頁
│ ├── BackDashboard.vue # 1. 數據儀表板
│ ├── users/ # --- 使用者管理子模組 ---
│ │ ├── UserList.vue # 2. 使用者管理(列表)
│ │ └── UserDetail.vue# 3. 使用者詳細資訊
│ ├── products/ # --- 商品管理子模組 ---
│ │ ├── ProductList.vue # 4. 商品管理(列表)
│ │ └── ProductEdit.vue # 5. 編輯商品資訊
│ ├── orders/ # --- 訂單管理子模組 ---
│ │ ├── OrderList.vue # 6. 訂單管理(列表)
│ │ └── OrderDetail.vue # 7. 訂單詳細資訊
│ └── notices/ # --- 系統通知子模組 ---
│ ├── NoticeList.vue # 8. 系統通知(列表)
│ └── NoticeEdit.vue # 9. 編輯系統通知

├── App.vue # 根組件
└── main.js # 專案初始化
