<script setup>

    import { useRouter } from 'vue-router'
    const router = useRouter()

    const navigateTo = (type) => {
        if (type === 'login') {
            router.push('/login') 
        } else if (type === 'Adminlogin') {
        // Tibame的localhost port好像是5500 這個部分要再確認看看 
        const adminUrl = 'http://localhost:5174/adminlogin' 
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
            <button class="entry-card" @click="navigateTo('login')">
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
    </main>
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
