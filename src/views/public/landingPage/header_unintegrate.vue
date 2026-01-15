<template>
  <header class="main-header">
    <div class="logo">
      <a href="./index.html">
        <img src="./img/part_Logo2.png" alt="UniCare Logo" />
      </a>
    </div>

    <label class="hb">
      <input type="checkbox" class="menu-switch" v-model="isMenuOpen" />
      <span class="bar bar1"></span>
      <span class="bar bar2"></span>
      <span class="bar bar3"></span>
    </label>

    <nav class="main-menu" :class="{ 'is-active': isMenuOpen }">
      <ul class="menu">
        <li v-for="item in menuItems" :key="item.text" class="menu-item">
          <a :href="item.link">{{ item.text }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const menuItems = [
  { text: '關於我們', link: './aboutUs.html' },
  { text: '功能介紹', link: './aboutFounction.html' },
  { text: '使用心得', link: './aboutReward.html' },
  { text: '聯絡我們', link: './info.html' },
  { text: '樂活商城', link: './Shop.html' },
  { text: '登入', link: './Login.html' }
];
</script>

<style scoped>

.main-header {
  position: sticky;
  display: flex;
  top: 0;
  z-index: 100; 
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5%; 
  background-color: white;
  font-family: 'Noto Sans TC', sans-serif;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo img {
  display: block;
  height: 40px;
  width: auto;
}

.menu-switch {
  display: none;
}

.menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

/* rwd */
@media screen and (min-width: 768px) {
  .hb {
    display: none;
  }
  .main-menu .menu {
    display: flex;
  }
  .main-menu a {
    color: #2E6669;
    text-decoration: none;
    padding: 10px 1em;
    transition: color 0.3s;
  }
  .main-menu a:hover {
    color: #4a9e9e;
  }
}

@media screen and (max-width: 768px) {
  .hb {
    display: block;
    width: 45px;
    height: 45px;
    border: rgba(0, 0, 0, 0.54) solid 3px;
    border-radius: 6px;
    cursor: pointer;
  }
  .hb .bar {
    display: block;
    width: 75%;
    height: 3px;
    margin: 5px auto;
    background-color: #2E6669;
    transition: 0.3s;
  }
  
  .main-menu {
    position: absolute;
    top: 100%;
    left: -100%; 
    background-color: #fff;
    width: 60%;
    height: calc(100vh - 60px);
    transition: left 0.6s ease;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  }

  .main-menu.is-active {
    left: 0;
  }

  .main-menu ul li a {
    display: block;
    padding: 15px 20px;
    color: #2E6669;
    text-decoration: none;
    border-bottom: 1px solid #f0f0f0;
  }
}
</style>