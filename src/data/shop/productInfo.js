// 商品卡片展示用資料
//  // export表示資料可供匯出

// 抓取目前的根目錄路徑
const baseURL = import.meta.env.BASE_URL;

export const allProducts = [
  { 
    id: 1,
    category: '骨骼關節保養',
    image: `${baseURL}images/shop/product_01.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_01_L.jpg`, small: `${baseURL}images/shop/small/product_01_S.jpg` },
      { large: `${baseURL}images/shop/pill_01.jpg`, small: `${baseURL}images/shop/small/pill_01_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '海洋鈣鎂D+強效錠',
    spec: '60錠 / 袋',
    price: 480,
    tag: '熱銷冠軍',
    keywords: '鈣片, 補鈣, 睡覺, 抽筋, 牛奶, 骨頭',
    desc: '嚴選愛爾蘭紅藻鈣，多孔結構吸收佳。搭配鎂與D3，穩固骨骼基石，睡前補充助入睡。',
    features: [
      '專利愛爾蘭海藻鈣：源自純淨海域，多孔性結構，吸收率高達 39.5%。',
      '黃金比例配方：鈣與鎂 2:1 完美比例，協同作用效果更佳。',
      '增量維生素 D3：每份添加 400IU，大幅提升鈣質吸收效率。',
      '添加 CPP 酪蛋白：鎖住鈣質不流失，全家人補鈣首選。'
    ],
    details: {
      dosage: '錠劑',
      quantity: '60 錠/袋',
      days: '30 天',
      usage: '每日 2 錠，建議於睡前食用，幫助入睡與鈣質吸收。',
      warning: '本產品含有牛奶及其製品，不適合對其過敏體質者食用。'
    },  
    stock_quantity: 20,
  },
  { 
    id: 2,
    category: '骨骼關節保養',
    image: `${baseURL}images/shop/product_02.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_02_L.jpg`, small: `${baseURL}images/shop/small/product_02_S.jpg` },
      { large: `${baseURL}images/shop/pill_02.jpg`, small: `${baseURL}images/shop/small/pill_02_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '葡萄糖胺軟骨素複方',
    spec: '90錠 / 袋',
    price: 820,
    tag: '長輩首選',
    keywords: '膝蓋, 爬樓梯, 軟骨, 關節, 走路, 孝親',
    desc: '行動力升級！葡萄糖胺結合軟骨素，雙重滋補關鍵。添加貓爪藤，上下樓梯潤滑不卡關。', 
    features: [
      '雙重關鍵原料：高純度葡萄糖胺鹽酸鹽＋鯊魚軟骨素，提供潤滑與彈性。',
      '貓爪藤萃取物：亞馬遜雨林的天然草本，溫和舒緩關鍵不適。',
      '維生素 C 加乘：促進膠原蛋白形成，有助於傷口癒合與結締組織生長。',
      '長輩保養首選：適合隨年齡增長感到僵硬、活動不順暢的族群。'
    ],
    details: {
      dosage: '錠劑',
      quantity: '90 錠/袋',
      days: '30 天',
      usage: '每日 3 錠，可分次食用，建議飯後搭配溫開水。',
      warning: '本產品含甲殼類、魚類製品，孕婦及哺乳期婦女使用前請諮詢醫師。'
    },
    stock_quantity: 3,
  },
  { 
    id: 3,
    category: '骨骼關節保養',
    image: `${baseURL}images/shop/product_03.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_03_L.jpg`, small: `${baseURL}images/shop/small/product_03_S.jpg` },
      { large: `${baseURL}images/shop/pill_03.jpg`, small: `${baseURL}images/shop/small/pill_03_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: 'UC-II膠原蛋白',
    spec: '30膠囊 / 袋',
    price: 1350,
    tag: '',
    keywords: '膠原蛋白, 運動, 健身, 關節, 跑步',
    desc: '美國專利UC-II®，低溫萃取保留活性。每日一顆，保護力勝葡萄糖胺兩倍，修復關鍵。', 
    features: [
      '美國專利 UC-II®：擁有哈佛醫學院等多項研究支持，40mg 足量添加。',
      '低溫萃取技術：完整保留三股螺旋活性結構，確保有效利用。',
      '高純度玻尿酸：來自流行鏈球菌發酵，補水潤滑，舒適度再升級。',
      '橄欖果實萃取：富含多酚物質，調節生理機能，提升保護力。'
    ],
    details: {
      dosage: '膠囊',
      quantity: '30 粒/袋',
      days: '30 天',
      usage: '每日 1 粒，空腹食用效果最佳（建議早餐前）。',
      warning: '兒童、孕婦、哺乳婦女及服用藥物者，食用前請先諮詢醫療人員。'
    },
    stock_quantity: 0,
  },
  { 
    id: 4,
    category: '骨骼關節保養',
    image: `${baseURL}images/shop/product_04.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_04_L.jpg`, small: `${baseURL}images/shop/small/product_04_S.jpg` },
      { large: `${baseURL}images/shop/pill_04.jpg`, small: `${baseURL}images/shop/small/pill_04_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '靈活關節養護配方',
    spec: '60錠 / 袋',
    price: 650,
    tag: '全素可食',
    keywords: '素食, 薑黃, MSM, 關節痛, 久站',
    desc: '久站久坐首選！高純度MSM搭配薑黃，有效舒緩沉重感，告別僵硬，找回輕鬆自在節奏。', 
    features: [
      '99.9% 高純度 MSM：美國大廠原料，形成軟骨組織的重要關鍵成分。',
      '薑黃素精華：天然的代謝推進器，幫助舒緩緊繃，增強體力。',
      '黑胡椒萃取 (BioPerine)：臨床證實可提升薑黃素吸收率達 2000%。',
      '全素可食：不含動物性成分，素食者也能安心保養關鍵部位。'
    ],
    details: {
      dosage: '錠劑',
      quantity: '60 錠/袋',
      days: '30 天',
      usage: '每日 2 錠，建議飯後食用，以利薑黃吸收。',
      warning: '避免睡前食用，孕婦及哺乳期婦女不建議食用 MSM。'
    },
    stock_quantity: 20,
  },
  { 
    id: 5,
    category: '骨骼關節保養',
    image: `${baseURL}images/shop/product_05.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_05_L.jpg`, small: `${baseURL}images/shop/small/product_05_S.jpg` },
      { large: `${baseURL}images/shop/pill_05.jpg`, small: `${baseURL}images/shop/small/pill_05_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: 'HMB肌力修復膠囊',
    spec: '60膠囊 / 袋',
    price: 1180,
    tag: '長輩首選',
    keywords: '肌肉, 肌少症, 老人, 跌倒, 蛋白質',
    desc: '鎖住肌肉力量！HMB搭配維生素D與BCAA，穩固下盤，預防跌倒，讓日常行走更有力。', 
    features: [
      '關鍵 HMB-Ca：每份含 1500mg，相當於補充大量雞蛋與牛肉的精華。',
      '肌力黃金三角：HMB + BCAA + 維生素 D3，全方位維持肌肉生理功能。',
      '穩固防跌：特別適合肌少風險族群、術後恢復期或高齡長輩。',
      '好吞食膠囊：無特殊異味，輕鬆補充每日所需的肌肉營養。'
    ],
    details: {
      dosage: '膠囊',
      quantity: '60 粒/袋',
      days: '30 天',
      usage: '每日 2 粒，運動後食用或與正餐同時食用效果佳。',
      warning: '本品含乳製品（若BCAA來源為乳清），特殊體質請先諮詢醫師。'
    },
    stock_quantity: 20,
  },
  { 
    id: 6,
    category: '骨骼關節保養',
    image: `${baseURL}images/shop/product_06.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_06_L.jpg`, small: `${baseURL}images/shop/small/product_06_S.jpg` },
      { large: `${baseURL}images/shop/pill_06.jpg`, small: `${baseURL}images/shop/small/pill_06_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: 'MSM舒緩鎮痛配方',
    spec: '45錠 / 袋',
    price: 580,
    tag: '',
    keywords: '止痛, 舒緩, 鳳梨酵素, 運動傷害, 拉傷',
    desc: '急性不適加強版！高劑量MSM添加鳳梨酵素，針對強烈緊繃快速舒緩，運動恢復必備。', 
    features: [
      '加強型 MSM 配方：濃度提升，針對卡關不順提供強效支援。',
      '鳳梨酵素 (Bromelain)：高活性蛋白質分解酵素，幫助代謝、緩解不適。',
      '乳香萃取物 (Boswellia)：傳承千年的古老智慧，著名的舒緩草本成分。',
      '運動員推薦：適合馬拉松、登山或高強度訓練後的恢復期使用。'
    ],
    details: {
      dosage: '錠劑',
      quantity: '45 錠/袋',
      days: '15 天 (加強期)',
      usage: '每日 3 錠，可於不適感強烈時分次食用。',
      warning: '本品含鳳梨酵素，服用抗凝血藥物者請先諮詢醫師。'
    },
    stock_quantity: 0,
  },
  { 
    id: 7,
    category: '心血管循環',
    image: `${baseURL}images/shop/product_07.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_07_L.jpg`, small: `${baseURL}images/shop/small/product_07_S.jpg` },
      { large: `${baseURL}images/shop/pill_01.jpg`, small: `${baseURL}images/shop/small/pill_01_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '頂級深海rTG魚油',
    spec: '60軟膠囊 / 罐',
    price: 1280,
    tag: '熱銷冠軍',
    keywords: '魚油, omega-3, 血管, 腦部, 記憶力, 考試',
    desc: '先進rTG萃取，吸收率倍增。85%高濃度Omega-3，調節機能，思緒清晰代謝順暢。', 
    features: [
      '85% 高濃度 Omega-3：EPA+DHA 黃金比例，一顆抵多顆。',
      '頂級 rTG 型態：模擬天然結構，吸收率是一般魚油的 2 倍。',
      '純淨小型魚種：嚴選南太平洋鯷魚，無重金屬汙染疑慮。',
      'IFOS 五星認證：通過國際最高標準檢驗，新鮮度與純度有保障。'
    ],
    details: {
      dosage: '軟膠囊 (Softgel)',
      quantity: '60 粒/罐',
      days: '30 天',
      usage: '每日 2 粒，建議隨餐或飯後食用，吸收效果最佳。',
      warning: '正在服用抗凝血劑者（如阿斯匹靈），食用前請諮詢醫師。'
    },
    stock_quantity: 20,
  },
  { 
    id: 8,
    category: '心血管循環',
    image: `${baseURL}images/shop/product_08.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_08_L.jpg`, small: `${baseURL}images/shop/small/product_08_S.jpg` },
      { large: `${baseURL}images/shop/pill_02.jpg`, small: `${baseURL}images/shop/small/pill_02_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '還原型Q10能量軟膠囊',
    spec: '30軟膠囊 / 袋',
    price: 890,
    tag: '夜間保養',
    keywords: '心臟, 能量, 疲勞, 備孕, 皮膚',
    desc: '日本Kaneka還原型Q10，直接吸收無須轉換。啟動能量發電廠，找回年輕體力，氣色紅潤。', 
    features: [
      '日本 Kaneka 原廠：全球最大 Q10 供應商，酵母發酵製程，品質純淨。',
      '還原型 (Ubiquinol)：人體利用率高，非一般氧化型需轉化。',
      '複方維生素 B+E：協同抗氧化作用，增進皮膚與血球健康。',
      '青春能量之鑰：適合備孕調理、高壓工作者或熟齡保養。'
    ],
    details: {
      dosage: '軟膠囊',
      quantity: '30 粒/袋',
      days: '30 天',
      usage: '每日 1 粒，建議早餐後食用，啟動一日活力。',
      warning: '15歲以下小孩、懷孕或哺乳期間婦女及服用抗凝血藥品(Warfarin)之病患，不宜食用。'
    },
    stock_quantity: 20, 
  },
  { 
    id: 9,
    category: '心血管循環',
    image: `${baseURL}images/shop/product_09.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_09_L.jpg`, small: `${baseURL}images/shop/small/product_09_S.jpg` },
      { large: `${baseURL}images/shop/pill_03.jpg`, small: `${baseURL}images/shop/small/pill_03_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '納豆紅麴暢通配方',
    spec: '60膠囊 / 罐',
    price: 950,
    tag: '夜間保養',
    keywords: '膽固醇, 血脂, 納豆, 紅麴, 循環, 晚上吃',
    desc: '專為循環負擔設計。高活性納豆激酶加紅麴，把握夜間修復期，清理堆積，維持管道暢通。', 
    features: [
      '高活性納豆激酶：每份含 2000FU，有效幫助溶解堆積物。',
      '優質紅麴萃取：含有活性成分 Monacolin K，調節生理機能。',
      '夜間黃金保養：建議睡前食用，符合人體循環代謝時鐘。',
      '橘黴素未檢出：通過嚴格檢驗，不含橘黴素 (Citrinin)，安心食用。'
    ],
    details: {
      dosage: '膠囊',
      quantity: '60 粒/罐',
      days: '30 天',
      usage: '每日 2 粒，建議晚餐後或睡前食用。',
      warning: '本品含大豆製品。避免與葡萄柚同時食用；服用降血脂藥或抗凝血藥者，請諮詢醫師。'
    },
    stock_quantity: 20,
  },
  { 
    id: 10,
    category: '心血管循環',
    image: `${baseURL}images/shop/product_10.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_10_L.jpg`, small: `${baseURL}images/shop/small/product_10_S.jpg` },
      { large: `${baseURL}images/shop/pill_04.jpg`, small: `${baseURL}images/shop/small/pill_04_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '南極純淨磷蝦油',
    spec: '60軟膠囊 / 罐',
    price: 1150,
    tag: '',
    keywords: '蝦紅素, 氣色, 生理期, 磷蝦油, 抗氧化',
    desc: '南極純淨紅寶石。特殊磷脂質結構更好吸收，天然蝦紅素帶來好氣色，無魚腥味好入口。', 
    features: [
      '獨特磷脂質結構：兼具親水親油特性，進入體內快速吸收利用。',
      '天然蝦紅素：賦予磷蝦油紅寶石色澤，強效抗氧化保護。',
      '純淨無汙染：來自南極極淨海域，位於食物鏈底層，無生物累積毒素。',
      '女性保養首選：幫助調節每月不適，維持紅潤好氣色。'
    ],
    details: {
      dosage: '軟膠囊',
      quantity: '60 粒/罐',
      days: '30 天',
      usage: '每日 2 粒，隨餐食用。',
      warning: '本品含甲殼類製品，對其過敏者請勿食用。服用抗凝血劑者請諮詢醫師。'
    },
    stock_quantity: 20,
  },
  { 
    id: 11,
    category: '心血管循環',
    image: `${baseURL}images/shop/product_11.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_11_L.jpg`, small: `${baseURL}images/shop/small/product_11_S.jpg` },
      { large: `${baseURL}images/shop/pill_05.jpg`, small: `${baseURL}images/shop/small/pill_05_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: 'L-精氨酸循環加強錠',
    spec: '90錠 / 罐',
    price: 780,
    tag: '',
    keywords: '男性, 精力, 運動, 循環, 手腳冰冷',
    desc: '一氧化氮關鍵前驅物，擴充通道提升效率。推薦運動或男性保養，搭配鋅與馬卡，爆發力十足。', 
    features: [
      'NO 一氧化氮生成：精氨酸是重要原料，幫助放鬆管道，促進流動。',
      '鋅 (Zinc) 添加：有助於維持生長發育與生殖機能。',
      '黑馬卡萃取：祕魯國寶，滋補強身，提升運動表現與耐力。',
      '循環與代謝：改善手腳冰冷問題，提升整體精氣神。'
    ],
    details: {
      dosage: '錠劑',
      quantity: '90 錠/罐',
      days: '30-45 天',
      usage: '每日 2-3 錠，空腹或睡前食用效果最佳。',
      warning: '皰疹患者或正服用心血管藥物者，請諮詢醫師後再食用。'
    },
    stock_quantity: 20,
  },
  { 
    id: 12,
    category: '心血管循環',
    image: `${baseURL}images/shop/product_12.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_12_L.jpg`, small: `${baseURL}images/shop/small/product_12_S.jpg` },
      { large: `${baseURL}images/shop/pill_06.jpg`, small: `${baseURL}images/shop/small/pill_06_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '高濃縮無味大蒜精華',
    spec: '45錠 / 袋',
    price: 550,
    tag: '長輩首選',
    keywords: '大蒜, 免疫力, 感冒, 殺菌, 抵抗力',
    desc: '冷壓濃縮保留營養，去除刺鼻異味！天然防護罩增強保護力。小小一顆等於五千毫克新鮮大蒜。', 
    features: [
      '無味大蒜精：特殊去味技術，只有營養沒有口臭，社交不尷尬。',
      '高單位濃縮：濃縮比高，輕鬆攝取大蒜素 (Allicin)。',
      '調整體質：增強身體防禦系統，換季期間的最佳盟友。',
      '促進新陳代謝：含硫化合物，幫助身體循環代謝。'
    ],
    details: {
      dosage: '軟膠囊',
      quantity: '120 粒/罐',
      days: '60 天',
      usage: '每日 2 粒，飯後食用。',
      warning: '動手術前後兩週或有凝血功能異常者，請暫停食用。'
    },
    stock_quantity: 20,
  },
  { 
    id: 13,
    category: '晶亮護眼',
    image: `${baseURL}images/shop/product_13.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_13_L.jpg`, small: `${baseURL}images/shop/small/product_13_S.jpg` },
      { large: `${baseURL}images/shop/pill_01.jpg`, small: `${baseURL}images/shop/small/pill_01_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '游離型葉黃素複方膠囊',
    spec: '30膠囊 / 袋',
    price: 980,
    tag: '上班族必備',
    keywords: '眼睛, 葉黃素, 藍光, 手機, 電腦, 乾澀',
    desc: '美國專利FloraGLO®游離型葉黃素，10:2黃金比例。過濾有害光線，隱形防護罩，3C族晶亮首選。', 
    features: [
      '專利游離型：分子小、好吸收，直接利用無須轉換。',
      '黃金比例 10:2：依照美國國家衛生院 (NEI) 建議配方設計。',
      '山桑子添加：輔助舒緩疲勞，提升整體舒適度。',
      '3C 族群必備：針對藍光傷害提供全天候的隱形保護。'
    ],
    details: {
      dosage: '膠囊',
      quantity: '30 粒/袋',
      days: '30 天',
      usage: '每日 1 粒，建議飯後食用（葉黃素為脂溶性）。',
      warning: '兒童、孕婦、哺乳者，使用前請諮詢醫療人員。'
    },
    stock_quantity: 20,
  },
  { 
    id: 14,
    category: '晶亮護眼',
    image: `${baseURL}images/shop/product_14.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_14_L.jpg`, small: `${baseURL}images/shop/small/product_14_S.jpg` },
      { large: `${baseURL}images/shop/pill_02.jpg`, small: `${baseURL}images/shop/small/pill_02_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '北歐野生山桑子精華',
    spec: '60膠囊 / 袋',
    price: 850,
    tag: '',
    keywords: '夜盲, 開車, 花青素, 藍莓, 飛行員',
    desc: '飛行員的秘密！北歐野生山桑子，十倍花青素含量。適應光線變化，夜間開車、閱讀依然清晰銳利。', 
    features: [
      '高濃度花青素：超越一般藍莓，擁有強大的傳導與循環能力。',
      '暗處視覺支援：幫助合成視紫質，提升夜間或低光環境的視覺品質。',
      '促進循環：改善末梢循環，讓養分能順利輸送至靈魂之窗。',
      '天然抗氧化：對抗自由基傷害，延緩老化與退化風險。'
    ],
    details: {
      dosage: '膠囊',
      quantity: '60 粒/袋',
      days: '30 天',
      usage: '每日 2 粒，早晚各 1 粒，飯後食用。',
      warning: '本產品為天然植物萃取，如有色差屬正常現象。'
    },
    stock_quantity: 20,
  },
  { 
    id: 15,
    category: '晶亮護眼',
    image: `${baseURL}images/shop/product_15.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_15_L.jpg`, small: `${baseURL}images/shop/small/product_15_S.jpg` },
      { large: `${baseURL}images/shop/pill_03.jpg`, small: `${baseURL}images/shop/small/pill_03_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '紅藻蝦紅素護明軟膠囊',
    spec: '45錠 / 袋',
    price: 1080,
    tag: '全素可食',
    keywords: '素食, 蝦紅素, 眼睛酸, 對焦, 放鬆',
    desc: '超級維生素蝦紅素，保護力勝維他命C六千倍。深入調節核心，極速舒緩酸澀緊繃，找回靈活對焦。', 
    features: [
      '雨生紅球藻萃取：純植物來源，素食者可食用的天然蝦紅素。',
      '極速舒緩感：針對長時間用眼造成的肌肉緊繃，提供快速放鬆。',
      '靈活對焦力：幫助調節焦距，改善看近看遠轉換時的模糊感。',
      '超級抗氧化劑：強效捕捉自由基，全方位守護晶亮健康。'
    ],
    details: {
      dosage: '軟膠囊',
      quantity: '30 粒/袋',
      days: '30 天',
      usage: '每日 1 粒，建議飯後食用。',
      warning: '12歲以下兒童、孕婦、哺乳婦女不宜食用。'
    },
    stock_quantity: 20,
  },
  { 
    id: 16,
    category: '晶亮護眼',
    image: `${baseURL}images/shop/product_16.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_16_L.jpg`, small: `${baseURL}images/shop/small/product_16_S.jpg` },
      { large: `${baseURL}images/shop/pill_04.jpg`, small: `${baseURL}images/shop/small/pill_04_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '高濃度DHA晶亮魚油',
    spec: '60軟膠囊 / 罐',
    price: 1120,
    tag: '長輩首選',
    keywords: '兒童, 乾眼, 魚油, DHA, 水潤',
    desc: '專為水潤設計，高比例DHA鎖住水分。提升油層穩定，減少乾澀不適。清透小顆粒，兒童也可安心食。', 
    features: [
      '高含量 DHA：構成明亮視界的重要成分，比例高於 EPA。',
      '鎖水保濕：強化油層結構，減少水分揮發，對抗乾澀沙漠感。',
      '好吞食設計：小顆粒軟膠囊，無魚腥味，適合兒童與吞嚥困難者。',
      '玻尿酸添加：口服級玻尿酸，由內而外補水，水潤感再升級。'
    ],
    details: {
      dosage: '軟膠囊',
      quantity: '60 粒/罐',
      days: '30 天',
      usage: '每日 2 粒，隨餐食用。兒童可咬破食用。',
      warning: '凝血功能不佳者，食用前請先詢問醫師。'
    },
    stock_quantity: 20,
  },
  { 
    id: 17,
    category: '晶亮護眼',
    image: `${baseURL}images/shop/product_17.jpg`,
    gallery: [
      { large: `${baseURL}images/shop/product_17_L.jpg`, small: `${baseURL}images/shop/small/product_17_S.jpg` },
      { large: `${baseURL}images/shop/pill_05.jpg`, small: `${baseURL}images/shop/small/pill_05_S.jpg` },
      { large: `${baseURL}images/shop/nutrition_label_L.jpg`, small: `${baseURL}images/shop/small/nutrition_label.jpg` }
    ],
    title: '全方位晶亮綜合維他命',
    spec: '60錠 / 罐',
    price: 680,
    tag: '熱銷冠軍',
    keywords: '維他命, 綜合, 枸杞, 決明子, 便宜, CP值',
    desc: '基礎保養一瓶搞定！維生素A、C、E結合枸杞決明子。維持暗處視覺，中西合併，全家人溫和滋補。', 
    features: [
      '基礎營養打底：提供晶亮健康所需的維生素群與礦物質鋅。',
      '中西草本複方：結合西方營養學與東方枸杞、決明子智慧。',
      '維持暗處視覺：維生素 A 有助於維持在暗處的視覺功能。',
      '高 CP 值選擇：一瓶滿足全家大小的日常保養需求，經濟實惠。'
    ],
    details: {
      dosage: '錠劑',
      quantity: '60 錠/罐',
      days: '30-60 天',
      usage: '每日 1-2 錠，飯後食用。',
      warning: '本品含多種維生素，尿液變黃屬正常現象。'
    },
    stock_quantity: 20,
  },
]