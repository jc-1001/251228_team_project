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
    <p style="color: darkgrey;">
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
        height: 100%;
        background-color: $primaryLight;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
    }

    .logo-section {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 100px;
    }

    .logo {
        width: 400px;
        height: auto;
        object-fit: contain;
    }

    .selection-grid {
        display: flex;
        gap: 80px;
    }

    .entry-card {
        width: 320px;
        height: 260px;
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
        transition: transform 0.3s ease;

        &:hover {
        transform: translateY(-5px);
        }

    }

    .icon-wrapper {
        width: 120px;
        height: 120px;
        margin-bottom: 20px;
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
</style>
