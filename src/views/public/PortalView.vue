<script setup>

    import { useRouter } from 'vue-router'
    import { publicApi } from '@/utils/publicApi';
    
    const router = useRouter()

    const navigateTo = (type) => {
        if (type === 'Landing') {
            router.push('/Landing') 
        } else if (type === 'Adminlogin') {
        // 我的localhost port是5173，Tibame的好像是5500 這個部分要再確認~ 
        const adminUrl = 'http://localhost:5173'
        window.location.href = adminUrl
        }
    };
    
</script>

<template>
    <main class="entry-container">
        <header class="logo-section">
            <img src="@/assets/images/PortalView_logo.svg" alt="logo" class="logo"/>
        </header>
        <div class="selection-grid">
            <button class="entry-card" @click="navigateTo('Landing')">
                <div class="icon-wrapper">
                    <img src="@/assets/images/PortalView_client.svg" alt="前台"/>
                </div>
                <span class="label">前台</span>
            </button>
            <button class="entry-card" @click="navigateTo('Adminlogin')">
                <div class="icon-wrapper">
                    <img src="@/assets/images/PortalView_admin.svg" alt="後台"/>
                </div>
                <span class="label">後台</span>
            </button>
        </div>
            <p style="text-align: center;">
                <br>
                <!-- <strong></strong><br> -->
                <small><b>UniCare 身體健康數據中控台</b><br>
                    【Cjd105_第一組】<b>01 游佳純</b>丨02 徐子益丨05 羅方敏丨12 劉岳霖丨13 李妮丨17 黃煜軒 (依座號排列)
                </small>
            </p>
    </main>
    <p style="color: darkgrey; margin: 13px;">
        <small>本網站為緯育TibaMe_前端工程師班第98期學員專題成果作品,
            本平台僅供學習、展示之用。若有抵觸有關著作權,或有第三人主張侵害智慧財產權等情事,
            均由學員負法律上責任,緯育公司概不負責。若有侵權疑慮,您可以私訊
            <a href="https://www.facebook.com/TibaMe" style="color: #00BDD3;">緯育TibaMe</a>,
            後續會由專人協助處理。
        </small>
    </p>
</template>

<style lang="scss" scoped>

    .entry-container {
        width: 100%;
        min-height: 87vh; // 改為 min-height 確保內容過長時可捲動
        background-color: $primaryLight;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px; // 加入 padding 防止手機版貼邊
        box-sizing: border-box;
    }

    .logo-section {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 60px; // 縮小間距更符合比例
    }

    .logo {
        width: 100%; // 改為百分比配合 max-width
        max-width: 400px;
        height: auto;
        object-fit: contain;
    }

    .selection-grid {
        display: flex;
        gap: 40px; // 縮小間距
        flex-wrap: wrap; // 允許換行
        justify-content: center;
    }

    .entry-card {
        width: 280px; // 稍微收窄，增加手機版相容性
        height: 220px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: $white;
        box-shadow: $shadow;
        cursor: pointer;
        border: none;
        outline: none;
        border-radius: $radius_md;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
    }

    .icon-wrapper {
        width: 100px;
        height: 100px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .label {
        color: $black;
        @include subtitle2(true)
    }

    // --- RWD 響應式設定 ---

    // 平板與手機 (960px以下)
    @media (max-width: 960px) {
        .selection-grid {
            gap: 30px;
        }
        .entry-card {
            width: 240px;
            height: 200px;
        }
    }

    // 手機版 (600px以下)
    @media (max-width: 600px) {
        .logo-section {
            margin-bottom: 40px;
        }
        .logo {
            max-width: 280px; // 縮小手機版 Logo
        }
        .selection-grid {
            flex-direction: column; // 關鍵：改為垂直排列
            gap: 20px;
            width: 100%;
            align-items: center;
        }
        .entry-card {
            width: 100%; // 手機版按鈕寬度撐滿
            max-width: 320px; // 但限制最大寬度
            height: 180px;
        }
        .icon-wrapper {
            width: 80px;
            height: 80px;
        }
    }
</style>
