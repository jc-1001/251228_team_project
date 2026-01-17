<template>
  <div class="landing-page">
    <header class="main-header">
      <div class="logo">
        <router-link to="/"><img src="./img/part_Logo2.png" alt="UniCare Logo"></router-link>
      </div>

      <label class="hb">
        <input type="checkbox" class="menu-switch" v-model="isMenuOpen">
        <span class="bar bar1"></span>
        <span class="bar bar2"></span>
        <span class="bar bar3"></span>
      </label>
      
      <nav class="main-menu" :class="{ 'is-active': isMenuOpen }">
        <ul class="menu">
          <li class="menu-item"><router-link to="/aboutUs">關於我們</router-link></li>
          <li class="menu-item"><router-link to="/aboutFunction">功能介紹</router-link></li>
          <li class="menu-item"><router-link to="/aboutReward">使用心得</router-link></li>
          <li class="menu-item"><router-link to="/info">聯絡我們</router-link></li>
          <li class="menu-item"><router-link to="/Shop">樂活商城</router-link></li>
          <li class="menu-item"><router-link to="/Login">登入</router-link></li>
        </ul>
      </nav>
    </header>

    <div class="container">
      <div class="banner">
        <div class="banner-txt">
          <h1>UniCare</h1>
          <p><strong>距離再遠，關懷始終在身邊。<br>UniCare, You Care. 守護您最在乎的人。</strong></p>
          <router-link to="/register"><button>登入/註冊</button></router-link>
        </div>
      </div>
    </div>

    <div class="bridge">
      <h2>您可能有過這些困擾—</h2>
    </div>
    <div class="partOne">
      <div class="item"><img src="./img/partOne_1.png"><p>常忘記是否吃過藥，保健食品快沒了才發現</p></div>
      <div class="item"><img src="./img/partOne_2.png"><p>工作忙碌無法及時關心長輩的健康</p></div>
      <div class="item"><img src="./img/partOne_3.png"><p>無法和醫生清楚溝通身體情況</p></div>
      <div class="item"><img src="./img/partOne_4.png"><p>紙本記錄容易遺失或不完全</p></div>
    </div>

    <div class="bridge">
      <h2>健康管理，從簡單記錄開始：<br>UniCare 助您輕鬆掌握全方位的數位健康脈動。</h2>
    </div>
    <div class="partTwo">
      <div class="item"><img src="./img/partTwo.png"></div>
      <div class="item">
        <ul>
          <li><h3>我們的起點</h3></li>
          <li><p>我們深知健康不只是吞下一顆膠囊，而是來自於「持之以恆的紀錄」與「家人的陪伴」。<br>
          UniCare 的誕生，是為了打破傳統照護的冰冷，透過數位轉型，讓長輩能輕鬆上手，讓子女能隨時守護。</p></li>
        </ul> 
      </div>
    </div>

    <div class="bridge">
      <h2>三大承諾</h2>
    </div>
    <div class="partThree">
      <div class="item">
        <img src="./img/partThree_1.png">
        <ul><li><h3>透明化照護</h3><p>數據即時同步，讓「有沒有吃飯、有沒有吃藥」不再是重複的問句。</p></li></ul>
      </div>
      <div class="item">
        <img src="./img/partThree_2.png">
        <ul><li><h3>貼心提醒</h3><p>及時提醒您每日測量身體狀態、上傳飲食資訊、以及服藥和保健食品。</p></li></ul>
      </div>
      <div class="item">
        <img src="./img/partThree_3.png">
        <ul><li><h3>詳細記錄</h3><p>所有上傳的紀錄將完好保存在您的帳戶中，不用擔心遺失弄丟。</p></li></ul>
      </div>
    </div>

    <div class="bridge">
      <h2>功能介紹</h2>
    </div>
    <div class="partFour">
      <div class="card" v-for="(feature, index) in features" :key="index">
        <div class="pic"><img :src="feature.img" :alt="feature.title"></div>
        <div class="txt">
          <h3>{{ feature.title }}</h3>
          <p v-html="feature.desc"></p>
        </div>
      </div>
    </div>

    <div class="partFive">
      <div class="bridge" style="position: relative ; width: 100%;">
        <h2>使用心得</h2>
      </div>
      <div class="arrow-container left" @click="scrollTestimonials(-100)">
        <img src="./img/angle-up.png" style="rotate: -90deg;">
      </div>
      <div class="contence" ref="testimonialContainer">
        <img src="./img/partFive_1.png">
        <img src="./img/partFive_2.png">
        <img src="./img/partFive_3.png">
      </div>
      <div class="arrow-container right" @click="scrollTestimonials(100)">
        <img src="./img/angle-up.png" style="rotate: 90deg;">
      </div>
    </div>

    <a href="#" @click.prevent="scrollToTop" class="pagetop">
      <br>TOP<br>
    </a>

    <footer class="main-footer">
      <div class="logo">
        <router-link to="/"><img src="./img/part_Logo2.png"></router-link>
        <div class="footer_left">
          <ul class="list">
            <li><a href="#">隱私權保護政策</a></li>
            <li><a href="#">銷售條款</a></li>
            <li><a href="#">服務條款</a></li>
          </ul>
        </div>        
      </div>
      <nav class="main-menu-footer">
        <ul class="menu" style="list-style-type: none; display: flex;">
          <li class="menu-item"><router-link to="/info">聯絡我們</router-link></li>
          <li class="menu-item"><router-link to="/aboutQA">常見問題</router-link></li>
          <li class="menu-item"><router-link to="/aboutUs">關於我們</router-link></li>
          <li class="menu-item"><router-link to="/login">立即體驗</router-link></li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
const testimonialContainer = ref(null);

const features = [
  { img: './img/partFour_1.png', title: '輕鬆紀錄，生活不漏接', desc: '介面清楚便捷，在首頁即可快速紀錄與瀏覽當日狀態！' },
  { img: './img/partFour_2.png', title: '數據同步，關懷零時差', desc: '無論子女身在何處，登入同一個帳號，即可看到父母的最新狀態。' },
  { img: './img/partFour_3.png', title: '貼心提醒，警示不忘記', desc: '當健康數值異常或藥品與保健品庫存過低時，系統會自動標示醒目顏色。' },
  { img: './img/partFour_4.png', title: '隨時補貨，便捷又快速', desc: '子女可直接在網站內的「樂活商城」選購適合長輩的保健食品。' }
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollTestimonials = (amount) => {
  if (testimonialContainer.value) {
    testimonialContainer.value.scrollBy({ left: amount, behavior: 'smooth' });
  }
};
</script>

<style scoped>
/* 這裡貼上您原本 landingPage.css 的內容，並做細微調整 */
.landing-page {
  font-family: 'Noto Sans TC', sans-serif;
  color: #333;
}

/* --- 原 CSS 內容開始 --- */
.main-header {
  position: sticky;
  display: flex;
  top: 0;
  z-index: 100;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.logo img {
  height: 40px;
  width: auto;
}

/* 針對行動版選單的邏輯優化 */
@media screen and (max-width: 768px) {
  .main-menu {
    position: absolute;
    top: 100%;
    left: -100%;
    background-color: #fff;
    width: 60%;
    height: 100vh;
    transition: left .6s;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  }
  .main-menu.is-active {
    left: 0;
  }
  .hb {
    display: block;
    width: 45px;
    height: 45px;
    border: rgba(0, 0, 0, 0.540) solid 3px;
    border-radius: 6px;
    cursor: pointer;
  }
  .bar {
    display: block;
    width: 75%;
    height: 3px;
    margin: 5px auto;
    background-color: #2E6669;
  }
}

@media screen and (min-width: 769px) {
  .hb { display: none; }
  .main-menu .menu {
    display: flex;
    list-style: none;
  }
  .main-menu .menu-item a {
    padding: 10px 15px;
    color: #2E6669;
    text-decoration: none;
  }
}

/* Banner Section */
.banner {
  width: 100%;
  height: calc(100vh - 64px);
  background: url('./img/banner.png') no-repeat center center;
  background-size: cover;
}
.banner-txt {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10%;
}
.banner button {
  padding: 12px 24px;
  background-color: #2E6669;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.banner button:hover {
  background-color: #3d868a;
}

/* 其他區塊樣式載入... */
.bridge { text-align: center; margin: 4.5% 0; }
.bridge h2 { color: #2E6669; }

.partOne {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 0 15%;
}
.partOne .item { text-align: center; }
.partOne img { width: 80%; }

.partFour .card {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.partFour .card:nth-child(even) { flex-direction: row-reverse; }
.partFour .pic { width: 50%; text-align: center; }
.partFour .pic img { width: 70%; }
.partFour .txt { width: 50%; padding: 0 20px; }

.partFive {
  background-color: #E0F2F1;
  padding: 40px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.contence {
  display: flex;
  overflow-x: auto;
  width: 80%;
}
.contence img { height: 250px; margin: 0 10px; }
.arrow-container { cursor: pointer; display: flex; align-items: center; }

.pagetop {
  position: fixed;
  right: 5%;
  bottom: 10%;
  width: 60px;
  height: 60px;
  border: 1px solid #2E6669;
  border-radius: 50%;
  text-align: center;
  color: #2E6669;
  text-decoration: none;
  background: white;
}

.main-footer {
  padding: 40px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
}
/* --- 原 CSS 內容結束 --- */
</style>