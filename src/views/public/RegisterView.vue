
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { publicApi } from '@/utils/publicApi';

import PolicyModal from '@/components/register/PolicyModal.vue';
// 控制燈箱顯示的狀態
const showServiceModal = ref(false);
const showPrivacyModal = ref(false);
const agreePolicy = ref(false);

const router = useRouter();

// 1. 對應資料結構，reactive 物件在 script 存取不需加 .value
const memberProfile = reactive({
  full_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone_number: '',
  gender: 'M',
  birth_date: '',
  role: 'member',
  account_status: 1,
  
  height: null,
  weight: null,
  blood_type: 'A',
  has_chronic_disease: false, 
  chronic_disease_description: '',
  has_family_history: false,
  family_history_description: '',
  has_allergies: false,
  allergy_description: '',
  is_smoking: false,
  is_drinking: false,
  
  contact_name: '',
  relationship: '',
  emergency_phone_number: ''
});

// 2. 註冊處理邏輯

// 建立錯誤訊息物件
const errors = reactive({
  full_name: '',
  email: '',
  phone_number: '',
  contact_name: '',
  emergency_phone_number: '',
  height: '',
  weight: ''  
});


const handleRegister = async () => {
  // 錯誤訊息
  Object.keys(errors).forEach(key => errors[key] = '');
  let isValid = true;

  // 1. 驗證姓名
  if (!memberProfile.full_name.trim()) {
    errors.full_name = '請填寫真實姓名';
    isValid = false;
  }

  // 2. 驗證電子信箱 (正規表示式檢查)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!memberProfile.email) {
    errors.email = '請填寫電子信箱';
    isValid = false;
  } else if (!emailRegex.test(memberProfile.email)) {
    errors.email = '信箱格式不正確';
    isValid = false;
  }

  // 3. 驗證聯絡電話 (至少8-10位數字)
  const phoneRegex = /^09\d{8}$/; // 假設為台灣手機格式
  if (!memberProfile.phone_number) {
    errors.phone_number = '請填寫聯絡電話';
    isValid = false;
  } else if (!phoneRegex.test(memberProfile.phone_number)) {
    errors.phone_number = '手機格式需為 09 開頭的 10 位數字';
    isValid = false;
  }

  // 4. 驗證聯絡人姓名
  if (!memberProfile.contact_name.trim()) {
    errors.contact_name = '請填寫緊急聯絡人姓名';
    isValid = false;
  }

  // 5. 驗證聯絡人電話
  if (!memberProfile.emergency_phone_number) {
    errors.emergency_phone_number = '請填寫緊急聯絡人電話';
    isValid = false;
  } else if (!phoneRegex.test(memberProfile.emergency_phone_number)) {
    errors.emergency_phone_number = '電話格式不正確';
    isValid = false;
  }

  // 6. 驗證身高 (必填且需為正數)
  if (!memberProfile.height) {
    errors.height = '請填寫身高';
    isValid = false;
  } else if (memberProfile.height <= 0) {
    errors.height = '身高格式不正確';
    isValid = false;
  }

  // 7. 驗證體重 (必填且需為正數)
  if (!memberProfile.weight) {
    errors.weight = '請填寫體重';
    isValid = false;
  } else if (memberProfile.weight <= 0) {
    errors.weight = '體重格式不正確';
    isValid = false;
  }

  if (!isValid) return; // 如果驗證不通過，停止執行註冊

  if (!agreePolicy.value) {
    alert('請先閱讀並勾選同意服務條款與隱私權政策');
    return;
  }
 

  // 2. 密碼確認
  if (memberProfile.password !== memberProfile.confirmPassword) {
    alert('兩次輸入的密碼不一致！');
    return;
  }

  try {
    // 在 apiConfig.js還沒定義，API_ENDPOINTS.REGISTER可以先保留原本的網址，但建議統一
    const res = await publicApi.post('member/register_api.php', memberProfile);

    if (res.data.status === 'success') {
      alert('註冊成功！歡迎加入 UniCare');
      router.push({ name: 'Login' });
    } else {
      alert('註冊失敗：' + res.data.message);
    }
  } catch (error) {
    console.error("API 連線錯誤：", error);
    alert('無法連線到伺服器，（Port: 8888）。');
  }
};

</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="title">會員註冊</h2>
      <form @submit.prevent="handleRegister">
        
        <h3 class="section-title">基本資訊</h3>
        <div class="input-grid">
          <div class="form-group">
            <label>姓名</label>
            <input 
              v-model="memberProfile.full_name" 
              type="text" 
              placeholder="請輸入真實姓名"
              :class="{ 'error-input': errors.full_name }"
            />
            <span v-if="errors.full_name" class="error-msg">{{ errors.full_name }}</span>
          </div>
          <div class="form-group">
            <label>性別</label>
            <select v-model="memberProfile.gender">
              <option value="M">男 (M)</option>
              <option value="F">女 (F)</option>
              <option value="O">其他 (O)</option>
            </select>
          </div>
          <div class="form-group">
            <label>電子信箱</label>
            <input
             v-model="memberProfile.email"
             type="email"
             placeholder="example@mail.com"
             :class="{ 'error-input': errors.email }"
            />
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <label>聯絡電話</label>
            <input
             v-model="memberProfile.phone_number"
             type="tel"
             placeholder="09xxxxxxxx"
             :class="{ 'error-input': errors.phone_number }"
            />
            <span v-if="errors.phone_number" class="error-msg">{{ errors.phone_number }}</span>
          </div>
          <div class="form-group">
            <label>密碼</label>
            <input type="password" v-model="memberProfile.password" required>
          </div>
          <div class="form-group">
            <label>確認密碼</label>
            <input type="password" v-model="memberProfile.confirmPassword" required>
          </div>
          <div class="form-group">
            <label>生日</label>
            <input type="date" v-model="memberProfile.birth_date">
          </div>
          <div class="form-group">
            <label>血型</label>
            <select v-model="memberProfile.blood_type">
              <option value="A">A 型</option>
              <option value="B">B 型</option>
              <option value="AB">AB 型</option>
              <option value="O">O 型</option>
            </select>
          </div>
        </div>

        <h3 class="section-title">健康檔案與習慣</h3>
        <div class="input-grid">

          <div class="form-group">
            <label>身高 (cm)</label>
            <input 
              type="number" 
              step="0.1" 
              v-model="memberProfile.height"
              placeholder="170.5"
              :class="{ 'error-input': errors.height }" 
            >
            <span v-if="errors.height" class="error-msg">{{ errors.height }}</span>
          </div>

          <div class="form-group">
            <label>體重 (kg)</label>
            <input 
              type="number" 
              step="0.1" 
              v-model="memberProfile.weight"
              placeholder="65.0"
              :class="{ 'error-input': errors.weight }"
            >
            <span v-if="errors.weight" class="error-msg">{{ errors.weight }}</span>
          </div>
          
          <div class="form-group full-width">
            <label>相關病史</label>
            <div class="inline-row">
              <div class="radio-group">
                <label><input type="radio" :value="true" v-model="memberProfile.has_chronic_disease"> 有</label>
                <label><input type="radio" :value="false" v-model="memberProfile.has_chronic_disease"> 無</label>
              </div>
              <input class="history-input" v-model="memberProfile.chronic_disease_description" placeholder="輸入描述">
            </div>
          </div>

          <div class="form-group full-width">
            <label>家族病史</label>
            <div class="inline-row">
              <div class="radio-group">
                <label><input type="radio" :value="true" v-model="memberProfile.has_family_history"> 有</label>
                <label><input type="radio" :value="false" v-model="memberProfile.has_family_history"> 無</label>
              </div>
              <input class="history-input" v-model="memberProfile.family_history_description" placeholder="輸入描述">
            </div>
          </div>

          <div class="form-group full-width">
            <label>藥物/食物過敏</label>
            <div class="inline-row">
              <div class="radio-group">
                <label><input type="radio" :value="true" v-model="memberProfile.has_allergies"> 有</label>
                <label><input type="radio" :value="false" v-model="memberProfile.has_allergies"> 無</label>
              </div>
              <input class="history-input" v-model="memberProfile.allergy_description" placeholder="輸入描述">
            </div>
          </div>

          <div class="form-group">
            <label>有無抽菸</label>
            <div class="radio-group">
              <label><input type="radio" :value="true" v-model="memberProfile.is_smoking"> 有</label>
              <label><input type="radio" :value="false" v-model="memberProfile.is_smoking"> 無</label>
            </div>
          </div>
          <div class="form-group">
            <label>有無飲酒</label>
            <div class="radio-group">
              <label><input type="radio" :value="true" v-model="memberProfile.is_drinking"> 有</label>
              <label><input type="radio" :value="false" v-model="memberProfile.is_drinking"> 無</label>
            </div>
          </div>
        </div>

        <h3 class="section-title">緊急聯絡人</h3>
        <div class="input-grid">
          <div class="form-group">
            <label>聯絡人姓名</label>
            <input
             v-model="memberProfile.contact_name"
             type="text" 
             placeholder="緊急聯絡人姓名"
             :class="{ 'error-input': errors.contact_name }"
          />
          <span v-if="errors.contact_name" class="error-msg">{{ errors.contact_name }}</span>
          </div>
          <div class="form-group">
            <label>關係</label>
            <input v-model="memberProfile.relationship" placeholder="例如：父子">
          </div>
          <div class="form-group full-width">
            <label>聯絡人電話</label>
            <input
              v-model="memberProfile.emergency_phone_number"
              type="tel"
              placeholder="09xxxxxxxx"
              :class="{ 'error-input': errors.emergency_phone_number }"
            />
            <span v-if="errors.emergency_phone_number" class="error-msg">{{ errors.emergency_phone_number }}</span>
          </div>
        </div>
        <br>
          <div class="policy-check">
            <input type="checkbox" id="policy" v-model="agreePolicy" required>
            <label for="policy">我已閱讀並同意
              <a href="javascript:void(0)" @click.stop="showServiceModal = true">UniCare服務條款</a> 
              與 
              <a href="javascript:void(0)" @click.stop="showPrivacyModal = true">隱私權政策</a>
            </label>
          </div>
        
          <button type="submit" class="primary-btn">註冊</button>
      </form>
    </div>
  </div>

    <PolicyModal 
      v-if="showServiceModal" 
      title="UniCare 服務條款" 
      @close="showServiceModal = false"
    >
      <p>歡迎您使用本購物網站，本網站是由「UniCare 身體健康數據中控台」營運。（以下簡稱“本網站”）提供的服務。
      請仔細閱讀以下服務條款（以下簡稱“本條款”），一旦您使用本網站，即表示您同意遵守本條款。<br>
      1. 服務內容<br> 1.1 本網站提供的服務包括但不限於商品的在線瀏覽、購買、付款、配送、售後服務等。<br>
      2. 用戶資格<br> 2.1 使用本網站服務的用戶必須具備完全的民事行為能力。若用戶為未成年人，需在其監護人指導下使用本網站。<br>
      3. 用戶註冊<br> 3.1 用戶在使用本網站某些功能時，可能需要註冊帳戶。註冊帳戶時，請提供準確、完整的個人資料，並保持這些資料的更新。<br>
      3.2 用戶應妥善保管帳戶密碼，不得將帳戶、密碼轉讓或出借給他人使用。用戶對使用其帳戶和密碼進行的一切活動負全部責任。<br>
      4. 隱私保護<br> 4.1 本網站重視用戶的隱私保護，將按照隱私政策處理用戶的個人資料。<br>
      5. 訂單及付款<br> 5.1 用戶在本網站提交的訂單視為購買商品的要約。只有在本網站確認接受該訂單後，該訂單才生效。<br>
       5.2 本網站提供多種支付方式，用戶可選擇適合自己的支付方式進行付款。<br>
      6. 配送服務<br> 6.1 本網站將根據用戶提供的配送地址進行商品配送。配送時間和費用將根據具體情況確定。<br>
      7. 退換貨政策<br> 7.1 用戶在收到商品後，如需退換貨，請參照本網站的退換貨政策。<br>
      8. 知識產權<br> 8.1 本網站及其所使用的所有內容（包括但不限於文字、圖像、音頻、視頻等）均受著作權、商標權及其他相關法律的保護。<br>
      9. 責任限制<br> 9.1 本網站對因不可抗力或其他非本網站過錯原因造成的服務中斷或損失不承擔責任。<br>
      10. 條款修改<br> 10.1 本網站有權根據需要修改本條款，修改後的條款將在本網站公佈。用戶繼續使用本網站即視為接受修改後的條款。<br>
      11. 其他<br> 11.1 本條款的解釋、效力及糾紛解決均適用中華民國之法律。<br>
       11.2 若本條款的任何條款被視為無效或不可執行，該條款應在必要的最低限度內被修改或刪除，且不影響其他條款的有效性和可執行性。
      </p>
    </PolicyModal>

    <PolicyModal 
      v-if="showPrivacyModal" 
      title="隱私權政策" 
      @close="showPrivacyModal = false"
    >
      <p>非常歡迎您光臨「UniCare 身體健康數據中控台」（以下簡稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，
        特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：</p>
      <p>一、隱私權保護政策的適用範圍<br>
        隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。
        隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。<br>
        二、個人資料的蒐集、處理及利用方式<br>
        當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，
        並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。<br>
        本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。<br>
        於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的 IP 位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，
        做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。<br>
        為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，
        我們會視需要公佈統計數據及說明文字，但不涉及特定個人之資料。<br>
        您可以隨時向我們提出請求，以更正或刪除您的帳戶或本網站所蒐集的個人資料等隱私資訊。聯繫方式請見最下方聯繫管道。<br>
        三、資料之保護<br>本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以
        保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，
        如有違反保密義務者，將會受到相關的法律處分。<br>
        如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。<br>
        四、網站對外的相關連結<br>本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。
        但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。<br>
        五、與第三人共用個人資料之政策<br>本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，
        但有法律依據或合約義務者，不在此限。<br>前項但書之情形包括不限於：<br>經由您書面同意。<br>法律明文規定。<br>
        為免除您生命、身體、自由或財產上之危險。<br>與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，
        且資料經過提供者處理或蒐集者依其揭露方式無從識別特定之當事人。<br>
        當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，
        經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。<br>有利於您的權益。<br>
        本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。<br>
        六、Cookie 之使用<br>為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的 Cookie，若您不願接受 Cookie 的寫入，
        您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕 Cookie 的寫入，但可能會導致網站某些功能無法正常執行 。<br>
        七、隱私權保護政策之修正<br>本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。<br>
        八、聯繫管道<br>對於本站之隱私權政策有任何疑問，或者想提出變更、移除個人資料之請求，請致電02-8685-6789 ( 09:00-19:00 )<br>或者 Email 至：service@unicare.com</p>
    </PolicyModal>

</template>

<style lang="scss" scoped>
.auth-container {
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  background: #f6f7f9;
  min-height: 100vh;
}

.auth-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.title {
  color: #2E6669;
  text-align: center;
  margin-bottom: 25px;
}

.section-title {
  font-size: 1.1rem;
  color: #2E6669;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 8px;
  margin: 25px 0 15px;
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 6px;
    font-size: 0.9rem;
    color: #4a5568;
    font-weight: 500;
  }
  input, select {
    padding: 10px;
    border: 1px solid #cbd5e0;
    border-radius: 6px;
    font-size: 0.95rem;
    &:focus { outline: none; border-color: #2E6669; }
  }
}

.full-width { grid-column: span 2; }

.inline-row {
  display: flex;
  align-items: center;
  gap: 15px;
  .radio-group { display: flex; gap: 10px; white-space: nowrap; }
  .history-input { flex: 1; }
}

.radio-group {
  display: flex;
  gap: 20px;
  padding: 8px 0;
  label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    font-weight: normal;
  }
}

.primary-btn {
  width: 100%;
  padding: 14px;
  background: #2E6669;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 35px;
  &:hover { background: #245254; }
}

// 錯誤提示樣式
.error-input {
  border-color: #ff5252 !important;
  background-color: #fff5f5;
}

.error-msg {
  color: #ff5252;
  font-size: 0.75rem;
  margin-top: 4px;
  display: block;
}

/* 燈箱 */
.policy-check label a {
  color: #2E6669;          
  text-decoration: none;    
  cursor: pointer;          /* 顯示「手指」游標 */
  transition: all 0.3s ease; /* 增加顏色變換的平滑感 */
  border-bottom: 1px solid rgba(46, 102, 105, 0.3); /* 輕微的底線裝飾 */
}

/*  (Hover) 的效果 */
.policy-check label a:hover {
  color: #3d8a8e;     
  border-bottom: 1px solid #2E6669; /* 底線變深 */
}

/* 點擊瞬間 (Active) 的回饋 */
.policy-check label a:active {
  transform: scale(0.95);    /* 輕微縮小 */
}

/* 響應式設計 */
@media (max-width: 600px) {
  .input-grid { grid-template-columns: 1fr; }
  .full-width { grid-column: span 1; }
  .inline-row { flex-direction: column; align-items: flex-start; gap: 8px; .history-input { width: 100%; } }
}

/* 針對寬度 360px 以下的優化 */
@media (max-width: 360px) {
  .auth-card { padding: 15px; }
  .title { font-size: 1.4rem; }
  .section-title { font-size: 1rem; }
  .form-group label { font-size: 0.85rem; }
  .primary-btn { font-size: 1rem; padding: 12px; }
  .radio-group { gap: 15px; }
}
</style>