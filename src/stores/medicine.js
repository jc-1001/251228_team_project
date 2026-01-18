import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { useUserStore } from '@/stores/user.js'

export const useMedicineStore = defineStore('medicine', () => {
  const items = ref([])

  function fetchItems() {
    // const userStore = useUserStore()
    // const userId = userStore.currentUserId
    // demo data only
    items.value = [
      {
        id: 1,
        name: 'Item A',
        image: '/src/assets/images/mdc1_1.jpg',
        eatTimes: 'after',
        oneTime: '1',
        timeCourse: ['morning', 'evening'],
        checked: false,
      },
      {
        id: 2,
        name: 'Item B',
        image: '/src/assets/images/mdc1_2.jpg',
        eatTimes: 'after',
        oneTime: '2',
        timeCourse: ['bedtime'],
        checked: false,
      },
      {
        id: 3,
        name: 'Item C',
        image: '/src/assets/images/mdc1_3.jpg',
        eatTimes: 'after',
        oneTime: '1',
        timeCourse: ['morning', 'noon', 'evening', 'bedtime'],
        checked: false,
      },
      {
        id: 4,
        name: 'Item D',
        image: '/src/assets/images/mdc1_4.jpg',
        eatTimes: 'after',
        oneTime: '3',
        timeCourse: ['morning', 'bedtime'],
        checked: false,
      },
      {
        id: 5,
        name: 'Item E',
        image: '/src/assets/images/mdc1_3.jpg',
        eatTimes: 'after',
        oneTime: '2',
        timeCourse: ['morning'],
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
