import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { useUserStore } from '@/stores/user.js'

export const useMedicineStore = defineStore('medicine', () => {
  const items = ref([])

  function fetchItems() {
    // const userStore = useUserStore()
    // const userId = userStore.currentUserId
    // demo用的假資料 之後會改成後端撈
    items.value = [
      {
        id: 1,
        name: '維他命C',
        dayEat: 1,
        oneTime: '1',
        image: '/src/assets/images/mdc1_1.jpg',
      },
      {
        id: 2,
        name: '止痛藥',
        dayEat: 2,
        oneTime: '2',
        image: '/src/assets/images/mdc1_2.jpg',
      },
      {
        id: 3,
        name: '感冒藥',
        dayEat: 3,
        oneTime: '1',
        image: '/src/assets/images/mdc1_3.jpg',
      },
      {
        id: 4,
        name: '魚油',
        dayEat: 1,
        oneTime: '3',
        image: '/src/assets/images/mdc1_4.jpg',
      },
    {
        id: 5,
        name: '鈣片',
        dayEat: 2,
        oneTime: '2',
        image: '/src/assets/images/mdc1_3.jpg',
    }

    ]
  }
  return { items, fetchItems}
})
