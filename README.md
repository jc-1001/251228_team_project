# UniCare 身體健康數據中控台 前台

### [FIGMA](https://www.figma.com/design/X78x31tK2e6S5C17o5cA0N/%E5%9C%98%E9%AB%94%E5%B0%88%E9%A1%8C%E8%A8%AD%E8%A8%88%E6%AD%A3%E5%BC%8F-%E5%A4%9A%E9%A0%81%E9%9D%A2-?node-id=0-3&t=zSXHFTp5cfmQ1esO-1)

### [我們的簡報]()

### [影片]()

## 前後台以及後端github

### [前台本頁](https://github.com/jc-1001/251228_team_project)

### [後台](https://github.com/jc-1001/260110-backstage)

### [API](https://github.com/jc-1001/20260127-api)

## 頁面大致分布

```text
src/
├── api/                        # API 請求層 (依模組與權限分組)
│   ├── auth.js                 # 登入、註冊、權限校驗
│   ├── client/                 # 前台 13 頁 API (如: fetchDietLog, addToCart)
│   └── public.js               # Landing Page 聯絡表單、公用數據
├── assets/                     # 靜態資源
│   ├── images/                 # 靜態圖片
│   │   ├── public/             # Landing Page 用的形象大圖、Hero Banner
│   │   ├── client/             # 前台系統圖標 (如：飲食類別 Icon、藥盒圖)
│   │   └── common/             # 全站共用 (Logo, 預設頭像, 404 圖片)
│   ├── icons/                  # 存放所有原始 .svg 檔案
│   └── styles/                 # 樣式管理
│       ├── _variables.scss     # 顏色與斷點變數
│       ├── _mixins.scss        # 常用 CSS 技巧 (如: 垂直置中)
│       ├── _base.scss          # 基礎重置：Reset CSS、全域標籤樣式
│       ├── _layouts.scss       # 外殼樣式：MainLayout 與 AdminLayout 的框架佈局
│       ├── _components.scss    # 跨頁面小組件樣式
│       ├── _rwd.scss           # 針對手機/平板的共用微調
│       └── main.scss           # 入口 CSS (匯總以上所有檔案)
├── components/                 # 組件封裝層 (依複用性分層)
│   ├── common/                 # 【全站通用】前後台皆可呼叫
│   │   ├── charts/             # --- 大量圖表組件 ---
│   │   │   ├── BaseChart.vue   # 封裝 ECharts 基礎 (含 RWD Resize)
│   │   │   ├── VitalsChart.vue # 身體數據折線圖 (前後台共用)
│   │   │   └── RatioChart.vue  # 飲食比例圓餅圖
│   │   └── modals/             # --- 全站共用燈箱 ---
│   │       └── ConfirmBox.vue  # 全域確認彈窗 (如: 確定刪除嗎?)
│   └── client/                 # 【前台專屬使用組件】(如: 飲食卡片、藥盒零件)
│       └── modals/             # 【前台專屬燈箱】(燈箱集中處)
│           ├── successModal.vue # 成功彈窗
│           ├── confirmModal.vue # 確認/取消彈窗
│           └── errorModal.vue   # 失敗彈窗
├── data/                       # 物件資料 (Mock Data)，用於初期開發展示
├── hooks/                      # 組合式邏輯 (Composition API)
│   ├── useBreakpoint.js        # 監控手機/平板/桌面 RWD 狀態
│   └── useChart.js             # 封裝圖表初始化與銷毀邏輯
├── layouts/                    # 佈局外殼 (決定頁面框架)
│   ├── PublicLayout.vue        # Landing & Portal 用的輕量佈局 (無側邊欄)
│   ├── MainLayout.vue          # 前台系統佈局 (含 Navbar, Footer)
│   └── AdminLayout.vue         # 後台系統佈局 (含 Sidebar, Breadcrumbs)
├── router/                     # 路由設定
│   ├── index.js                # 主控台 (含 beforeEach 權限守衛)
│   ├── public.js               # 導航: Landing, Portal, Auth
│   └── client.js               # 導航: 前台 13 個功能頁路徑
├── stores/                     # Pinia 狀態管理
│   ├── user.js                 # 用戶角色(Admin/User)、Token、積分
│   ├── cart.js                 # 購物車列表、總金額計算
│   └── ui.js                   # 全域燈箱狀態、RWD 選單開關
├── views/                      # 頁面入口 (View 組件)
│   ├── public/                 # --- 公共/訪客區 (不需權限) ---
│   │   ├── LandingPage.vue     # 頁 1: 產品功能介紹
│   │   ├── PortalView.vue      # 頁 2: 入口選擇頁 (前/後台大按鈕)
│   │   └── LoginView.vue       # 前台登入/註冊頁
│   └── client/                 # --- 前台系統 (13 個獨立頁面) ---
│       ├── HomeView.vue        # 1. 首頁 (戰情室)
│       ├── DietLog.vue         # 2. 飲食日記
│       ├── Medicine.vue        # 3. 數位藥箱
│       ├── Metrics.vue         # 4. 身體數值中心
│       ├── shop/               # --- 商城子模組 ---
│       │   ├── ShopHome.vue    # 5. 商城首頁
│       │   ├── ProductDetail.vue # 6. 商品內頁
│       │   ├── Cart.vue        # 7. 購物車
│       │   └── Checkout.vue    # 8. 結帳頁面
│       ├── profile/            # --- 個人中心子模組 ---
│       │   ├── OrderList.vue   # 9. 訂單列表
│       │   ├── OrderDetail.vue # 10. 訂單詳情
│       │   ├── MyPoints.vue    # 11. 我的積分
│       │   └── ProfileEdit.vue # 12. 個人資料
│       └── Support.vue         # 13. 幫助中心
├── App.vue                     # 根組件
└── main.js                     # 專案初始化
```
