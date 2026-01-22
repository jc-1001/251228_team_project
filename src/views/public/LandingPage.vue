
<template>
  <div class="landing-page">
    <header class="main-header">
      <div class="logo">
        <router-link to="/"><img :src="logo" alt="UniCare Logo"></router-link>
      </div>

      <label class="hb">
        <input type="checkbox" class="menu-switch" v-model="isMenuOpen">
        <span class="bar bar1"></span>
        <span class="bar bar2"></span>
        <span class="bar bar3"></span>
      </label>
      
      <nav class="main-menu" :class="{ 'is-active': isMenuOpen }">
        <ul class="menu">
          <li class="menu-item"><a href="#aboutUs">關於我們</a></li>
          <li class="menu-item"><a href="#aboutFunction">功能介紹</a></li>
          <li class="menu-item"><a href="#aboutReward">使用心得</a></li>
          <li class="menu-item"><router-link to="/support">聯絡我們</router-link></li>
          <li class="menu-item"><router-link to="/Shop">樂活商城</router-link></li>
          <li class="menu-item"><router-link to="/Login">登入</router-link></li>
        </ul>
      </nav>
    </header>

    <div class="container" id="gotop">
      <div class="banner">
        <div class="banner-txt">
          <ul><li>
          <h1>UniCare</h1>
          <p><strong>距離再遠，關懷始終在身邊。<br>UniCare, You Care. 守護您最在乎的人。</strong></p></li></ul>
          <ul><li></li></ul>
          <ul><li><router-link to="/login"><button>登入/註冊</button></router-link></li></ul>
        </div>
      </div>
    </div>

    <div class="bridge">
      <h2>您可能有過這些困擾—</h2>
    </div>
    <div class="partOne">
      <div class="item"><img :src="problem1"><p>常忘記是否吃過藥，保健食品快沒了才發現</p></div>
      <div class="item"><img :src="problem2"><p>工作忙碌無法及時關心長輩的健康</p></div>
      <div class="item"><img :src="problem3"><p>無法和醫生清楚溝通身體情況</p></div>
      <div class="item"><img :src="problem4"><p>紙本記錄容易遺失或不完全</p></div>
    </div>

    <div class="bridge" id="aboutUs">
      <h2>健康管理，從簡單記錄開始：<br>UniCare 助您輕鬆掌握全方位的數位健康脈動。</h2>
    </div>
    <div class="partTwo">
      <div class="item"><img :src="LP_aboutus"></div>
      <div class="item">
        <ul>
          <li><h3>我們的起點</h3></li>
          <li><p>我們深知健康不只是吞下一顆膠囊，而是來自於「持之以恆的紀錄」與「家人的陪伴」。<br>
          UniCare 的誕生，是為了打破傳統照護的冰冷，透過數位轉型，讓長輩能輕鬆上手，讓子女能隨時守護。<br>
          對長輩而言， 它是最直覺的操作手冊，紀錄健康就像拍照一樣簡單。對子女而言，它是遠端的一雙眼，看見父母每天的飲食與服藥情形。</p></li>
        </ul> 
      </div>
    </div>

    <div class="bridge">
      <h2>三大承諾</h2>
    </div>
    <div class="partThree">
      <div class="item">
        <img :src="LP_promise1">
        <ul><li><h3>透明化照護</h3><p>數據即時同步，讓「有沒有吃飯、有沒有吃藥」不再是重複的問句，而是溫暖的默契。</p></li></ul>
      </div>
      <div class="item">
        <img :src="LP_promise2">
        <ul><li><h3>貼心提醒</h3><p>及時提醒您每日測量身體狀態、上傳飲食資訊、以及服藥和保健食品。</p></li></ul>
      </div>
      <div class="item">
        <img :src="LP_promise3">
        <ul><li><h3>詳細記錄</h3><p>所有上傳的紀錄將完好保存在您的帳戶中，不用擔心遺失弄丟。</p></li></ul>
      </div>
    </div>

    <div class="bridge" id="aboutFunction">
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
      <div class="bridge" style="position: relative ; width: 100%;" id="aboutReward">
        <h2>使用心得</h2>
      </div>
      <div class="arrow-container left" @click="scrollTestimonials(-100)">
        <img src="" style="rotate: -90deg;">
      </div>
      <div class="contence" ref="testimonialContainer">
        <img :src="LP_reward1">
        <img :src="LP_reward2">
        <img :src="LP_reward3">
      </div>
      <div class="arrow-container right" @click="scrollTestimonials(100)">
        <img src="" style="rotate: 90deg;">
      </div>
    </div>

    <a href="#gotop" class="pagetop">
      <br>TOP<br>
    </a>

    <footer class="main-footer">
      <div class="logo">
        <router-link to="/"><img :src="logo"></router-link>
        <div class="footer_left">
          <ul class="list">
            <li><a href="#">隱私權保護政策</a></li>
            <li><a href="#">銷售條款</a></li>
            <li><a href="#">服務條款</a></li>
          </ul>
        </div>        
      </div>
      <nav class="main-menu">
        <ul class="menu" style="list-style-type: none; display: flex;">
          <li class="menu-item"><router-link to="/support">聯絡我們</router-link></li>
          <li class="menu-item"><router-link to="/support">常見問題</router-link></li>
          <li class="menu-item"><a href="#aboutUs">關於我們</a></li>
          <li class="menu-item"><router-link to="/login">立即體驗</router-link></li>
        </ul>
      </nav>
    </footer>
      <p><br><small>本網站為緯育TibaMe_前端工程師班第98期學員專題成果作品,
            本平台僅供學習、展示之用。若有抵觸有關著作權,或有第三人主張侵害智慧財產權等情事,
            均由學員負法律上責任,緯育公司概不負責。若有侵權疑慮,您可以私訊
            <a href="https://www.facebook.com/TibaMe" style="color: #00BDD3;">緯育TibaMe</a>,
            後續會由專人協助處理。
      </small></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import logo from '/src/assets/images/common/logo.svg';
import problem1 from '/src/assets/images/public/LP_problem1.svg';
import problem2 from '/src/assets/images/public/LP_problem2.svg';
import problem3 from '/src/assets/images/public/LP_problem3.svg';
import problem4 from '/src/assets/images/public/LP_problem4.svg';
import LP_aboutus from '/src/assets/images/public/LP_aboutus.jpg';
import LP_promise1 from '/src/assets/images/public/LP_promise1.svg';
import LP_promise2 from '/src/assets/images/public/LP_promise2.svg';
import LP_promise3 from '/src/assets/images/public/LP_promise3.svg';
import LP_reward1 from '/src/assets/images/public/LP_reward1.png';
import LP_reward2 from '/src/assets/images/public/LP_reward2.png';
import LP_reward3 from '/src/assets/images/public/LP_reward3.png';  

const isMenuOpen = ref(false);
const testimonialContainer = ref(null);

const features = [
  { img: '/src/assets/images/public/LP_function1.jpg', title: '輕鬆紀錄，生活不漏接', desc: '介面清楚便捷，在首頁即可快速紀錄與瀏覽當日狀態！<br>醒目的「今日待辦事項」清單，幫助長輩養成健康好習慣。' },
  { img: '/src/assets/images/public/LP_function2.jpg', title: '數據同步，關懷零時差', desc: '無論子女身在何處，登入同一個帳號，即可看到父母的最新狀態。快速確認服藥情形，讓您不用再每天打電話詢問。' },
  { img: '/src/assets/images/public/LP_function3.jpg', title: '貼心提醒，警示不忘記', desc: '當健康數值異常或藥品與保健品庫存過低時，系統會自動標示醒目顏色，提醒子女注意。' },
  { img: '/src/assets/images/public/LP_function4.jpg', title: '隨時補貨，便捷又快速', desc: '子女可直接在網站內的「樂活商城」選購適合長輩的保健食品，獲得的積分可用更優惠的價格購買營養品。' }
];

const scrollTestimonials = (amount) => {
  if (testimonialContainer.value) {
    testimonialContainer.value.scrollBy({ left: amount, behavior: 'smooth' });
  }
};
</script>

<style scoped>

.landing-page {
  font-family: 'Noto Sans TC', sans-serif;
  color: #333;
}


  *{
      box-sizing: border-box;
      /* border: 1px solid black; */
      /* grid-auto-flow: row; */
      /* background-color: #F6F7F9; */
  }

  body{
    margin: 0px;
  }
  /* template */ /*  */
  /* é è¨­ */
  h2,h3,h4,h5,h6{
    font-family: 'Noto Sans TC', Regular;
    color: #2E6669;
  }
  p{
    /* font-weight: bold; */
  }
  
/* header */

.main-header{
    position:sticky;
    display: flex;
    top: 0;
    z-index: 1;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: white;
    font-family: 'Noto Sans TC', sans-serif;
    -webkit-text-stroke: #2E6669 0.3px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.logo img{
    display: block;
    height: 40px;     
    width: auto;
}




/* checkbox */
.menu-switch{
    display: none;
}

@media screen and (max-width: 768px) {
    .hb{
        position: relative;
        display: block;
        width: 45px;
        height: 45px;
        border: rgba(0, 0, 0, 0.540) solid 3px;
        border-radius: 6px;
        background-color: transparent;
    }
    .hb .bar{
        display: block;
        width: 75%;
        height: 3px;
        position: relative;
        margin: 0% auto;
        
        background-color: #2E6669;
    }
    .bar1 {
        top: 12px;
    }
    .bar2 {
        top: 18px;
    }
    .bar3{
        top: 25px;
    }
    .main-menu{
        position: absolute;
        /* display: none; */
        top: 100%;
        left: -100%;
        background-color: #fff;
        width: 60%;
        height: calc(100svh - 60px);
        transition: left .6s;
    }
    .main-menu ul li ~ li{
        /* border-top: 1px solid #2E6669; */
    }
    .main-menu ul li a{
        display: block;
        text-decoration: none;
        padding: 10px;
        font-size: 18px;
        color: #2E6669;
        background-color: white;
    }
    .main-header:has(.menu-switch:checked) .main-menu{
            left: 0px;
            z-index: 1;
    }
}
@media screen and (width >= 768px) {
    .hb { 
        display: none; 
    }

    .main-menu > ul {
        display: flex ;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .main-menu li {
        display: block;
    }
    .main-menu a{
        color: #2E6669;
        text-decoration: none;
        display: block;
        padding: 10px 1em;
        background-color: white;
    }
}

body,html{
  height: 100%;
  font-family: "Noto Sans TC"
}

    .container {
        margin: 0;
        padding: 0;
        list-style: none;
        width: 100%;
        height: auto;
        display: flex;
        background-color: black;
        margin: auto;
        justify-content: flex-start;
    }
    .banner{
        width: 100%;
        height: calc(100vh - 64px);
        background: url(src/assets/images/public/LP_hero.jpg);
        background-size: cover;
        background-position: 70% 50%;
    }

    .banner-txt{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-left: 10%;
    }
    .banner a{
        text-decoration: none;
    }
    button {
      margin-top: 24px;
      padding: 12px 24px;
      background-color: #2E6669;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }
    
    button:hover{
        background-color: white;
        color: #2E6669;
      }

.bridge{
  width: cover;
  height: 10%;
  text-align: center;
  margin: 4.5%;
}

/* partOne */

.partOne{
  display: grid;
  margin: 0px 15%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: row;
  gap: 20px 15%;
  
}

.partOne .item{
    /* border: 1px solid red; */
    text-align: center;
}

.partOne img{
  width: 80%;
  height: auto;
  justify-self: center;
}

.partOne p{
  margin: 6%;
  font-weight: bold;
}

/* partTwo */

.partTwo{
  display: grid;
  margin: 0% 5%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows:max-content;
  gap: 0px 5%;
}

.partTwo .item{
    /* border: 1px solid red; */
    text-align: left;
}

.partTwo img{
  width: 100%;
  height: auto;
}
.partTwo ul{
    padding: 5%;
    margin: auto 0%;
    /*  */
    list-style: none;
    padding-left: 0;
}
.partTwo ul li{
  margin: 6%;
  font-size: large;
}

/* partThree */

.partThree{
    display: grid;
  width: 100%;
  background-color: #E0F2F1;
  /* grid-template-columns: repeat(3, 1fr); */
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-flow: column;
    column-gap: 6.25%;
    padding-left: 6.25%;
    padding-right: 6.25%;
    place-self: center center;
}

.partThree .item{
    /* border: 1px solid red; */
    place-self: center center;
    margin: 6.25% auto;  
    text-align: center;
}

.partThree img{
    /* size: fit-content; */
    object-fit: contain;
    width: 100%;
    height: 18vw;
    justify-self: center;
}

.partThree ul{
    list-style: none;
    padding-left: 0;
    margin-top: 30px;
}

.partThree li{
    border:#2E6669 dashed 3px ;
    border-radius: 10px;
}

  /*pagetop*/
  .pagetop {
    width: 60px;
    height: 60px;
    position: fixed;
    right: 9%;
    bottom: 15%;
    border-radius: 50%;
    border: #2E6669 solid 1px;
    color: #2E6669;
    text-decoration: none;
    text-align: center;
    justify-content: center;
    font-size: small;
  }
  .pagetop:hover {
    background-color: #2E6669;
    color: #fff;
    }


.partFour{
    width: 100%;             
    display: flex;           
    flex-direction: column;  
    align-items: center;     
    margin: 0;
    padding: 40px 0; /*  */
}

.partFour .card:nth-child(odd){
    flex-direction: row-reverse;
}
.partFour .card {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;      
    /* border: 1px solid red; */
     margin: 30px 0;/*  */
}


.partFour .card .pic{
    width: 65%;
    display: flex;
    justify-content: center;
}


.partFour .card .pic img{
    width: 75%;
    height: auto;
}


.partFour .card .txt{
    width: 35%;
    padding: 0 40px; 
}


/* partFive */
  
.partFive {
    height: fit-content;
    width: 100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    background-color: #E0F2F1;
    justify-content: center;
    align-items: center;
}
.partFive .contence{
  width: 80%;
  height: 90%;
  position: relative; 
  padding: 10px auto;
  display: flex; 
  overflow: auto;
  /* border: 1px solid red; */
  margin: 0px;
}
.partFive .contence img{
  scale: 80%;
}

.partFive .contence::-webkit-scrollbar {
    display: none;
}


/* footer */

.main-footer{
    position:static;
    display: flex;
    bottom: 0;
    z-index: 1;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    background-color: white;
    font-family: 'Noto Sans TC', sans-serif;
    -webkit-text-stroke: #2E6669 0.3px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.main-footer .logo img{
    display: block;
    height: 40px;     
    width: auto;
    margin: 5% 0px;
}

div.footer_left{
            /* border: 1px solid black; */
            list-style: none;
        }
        div.footer_left ul.list{
            /* border: 1px solid red; */
            list-style: none;
            margin: 0;
            padding: 0;
        }
        div.footer_left ul.list > li {
            display: inline-block;
            /* border: 1px solid orange; */
            vertical-align: top;
        }
        
        div.footer_left ul.list > li > a{
            display: inline-block;
            /* border: 1px solid orange; */
            padding: 5px 10px;
            text-decoration: none;
        }


@media screen and (min-width: 480px) and (max-width: 768px) {
    
    .main-menu{
        position: absolute;
        /* display: none; */
        top: 100%;
        left: -100%;
        background-color: #fff;
        width: 60%;
        height: calc(100svh - 60px);
        transition: left .6s;
    }
    .main-menu ul li ~ li{
        list-style: none;
        /* border-top: 1px solid #2E6669; */
    }
    .main-menu ul li a{
        display: block;
        text-decoration: none;
        padding: 10px;
        font-size: 18px;
        color: #2E6669;
        background-color: white;
    }
    .main-footer:has(.menu-switch:checked) .main-menu{
            left: 0px;
            z-index: 1;
    }

    /* partOne */

  .partOne{
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: 100%;
    
  }
    .partTwo{
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns:100%;
      gap: 0px;
    }

    .partTwo .item{
        text-align: left;
    }
    .partThree{
    background-color: #E0F2F1;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: 100%;
  }

  .partThree img{
      width: 100%;
      height: calc(30vh - 64px);
  }

    .partFour{
      width: 100%;             
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      grid-template-columns:100%; 
      align-items: center;     
      margin: 0;
  }

  .partFour .card:nth-child(odd){
  }
  .partFour .card {
      width: 100%;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns:100%; 
      justify-items: center;
      /* border: 1px solid red; */
  }
  .partFour .card .pic{
    width: fit-content;
  }


  .partFour .card .pic img{
      width: 100%;
  }


  .partFour .card .txt{
      width: 100%;
      text-align: center;
  }
    
}

/* ========================== */

@media screen and (max-width: 1080px) {
  .banner {
    padding: 80px 40px; /* 縮小左右間距 */
    flex-direction: row; /* 保持橫向但準備縮小內容 */
    align-items: center;
    background-position: 75% 50%;
    align-items: center;
  }

  .banner-txt {
    flex: 1.2; /* 稍微增加文字佔比 */
    padding-right: 20px;
    color: #333;
    font-weight: normal;
  }

  .banner-txt h1 {
    font-size: 3rem; /* 降低標題字體大小 */
    line-height: 1.2;
  }
}

/* ========================== */
@media screen and (max-width: 1024px) {
  .banner {
    background-position: 80% 50%; 
  }

  .banner-txt {
    flex: 1.5; /* 讓文字區塊佔據更多空間 */
    max-width: 500px; /* 限制最大寬度防止文字拉得太散 */
    color: #d0d0d0;
    font-weight: normal;
    
    h1 {
      font-size: 3rem; /* 縮小標題 */
      line-height: 1.2;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 1.1rem; /* 稍微縮小段落文字 */
      line-height: 1.6;
    }
  }

  .banner-txt h1 {
    font-size: 3rem; /* 降低標題字體大小 */
    line-height: 1.2;
  }
}

/* ========================== */

@media screen and (width = 768px) {
  .banner {
    width: cover;
    height: 60vh;
    background: url(src/assets/images/client/banner2.png);
    background-size: cover;
    background-position: 75% 70%;
    background-repeat: no-repeat;
    display: grid;
    justify-content: center;
    align-items: center;
    padding: 0;

  }

  .banner-txt {
    height: 50vh;
    width: fit-content;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    color: #333;
    /* border: #2E6669 solid 1px; */
    text-align: center;

  }
}

/* ========================== */

@media screen and (max-width: 767px) {
  .banner {
    width: cover;
    height: 60vh;
    background: url(src/assets/images/client/banner2.png);
    background-size: cover;
    background-position: 75% 70%;
    background-repeat: no-repeat;
    

  }

  .banner-txt {
    height: 90%;
      width: fit-content;
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      color: #333;
      justify-content: center;
      align-items: center;
      text-align: center;

  }

  .banner-txt h1 {
    font-size: 2.5rem;
  }

  .banner-btn {
    justify-content: center; /* 按鈕置中 */
    gap: 15px;
  }
  
  /* 修正 Banner 內的裝飾圓圈或背景遮罩 */
  .mask {
    width: 120%; /* 擴大遮罩比例以覆蓋背景 */
    left: -10%;
  }
}

/* ===================== */


@media screen and (max-width: 480px) {
  
  .banner-txt {
      color: black;
  }
  .banner-txt h1 {
    font-size: 2rem;
  }
  
  .banner-btn {
    flex-direction: column; /* 按鈕改為垂直排列 */
    align-items: stretch;
  }
  
  .banner-btn .btn {
    margin: 5px 0;
    width: 100%; /* 按鈕寬度撐滿 */
  }
}


</style>

