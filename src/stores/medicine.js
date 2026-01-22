import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMedicineStore = defineStore('medicine', () => {
  const items = ref([])

  function fetchItems() {
    items.value = [
      {
        id: 1,
        name: '脈優',
        image: '/src/assets/images/mdc1_1.jpg',
        eatTimes: '餐前',
        oneTime: '1',
        daily: '2',
        timeCourse: ['早上', '晚上'],
        checked: false,
      },
      {
        id: 2,
        name: '降血糖藥',
        image: '/src/assets/images/mdc1_2.jpg',
        eatTimes: '餐後',
        oneTime: '2',
        daily: '2',
        timeCourse: ['早上', '睡前'],
        checked: false,
      },
      {
        id: 3,
        name: '綜合維他命',
        image: '/src/assets/images/mdc1_3.jpg',
        eatTimes: '餐後',
        oneTime: '1',
        daily: '4',
        timeCourse: ['早上', '中午', '晚上', '睡前'],
        checked: false,
      },
      {
        id: 4,
        name: '降血壓藥',
        image: '/src/assets/images/mdc1_4.jpg',
        eatTimes: '餐後',
        oneTime: '3',
        daily: '2',
        timeCourse: ['早上', '睡前'],
        checked: false,
      },
      {
        id: 5,
        name: '維生素C',
        image: '/src/assets/images/mdc1_3.jpg',
        eatTimes: '餐後',
        oneTime: '2',
        daily: '1',
        timeCourse: ['早上'],
        checked: false,
      },
    ]
  }

  function addItem(item) {
    items.value.unshift({
      id: Date.now(),
      ...item,
    })
  }

  return { items, fetchItems, addItem }
})
