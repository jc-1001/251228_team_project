import { ref } from 'vue'
import { defineStore } from 'pinia'

const API_DOMAIN = (import.meta.env.VITE_API_DOMAIN || '').replace(/\/$/, '')
const API_URL = `${API_DOMAIN}/medicine/get_member_medications.php`
const CREATE_URL = `${API_DOMAIN}/medicine/create_medication.php`
const UPDATE_URL = `${API_DOMAIN}/medicine/update_medication.php`
const DETAIL_URL = `${API_DOMAIN}/medicine/get_medication_detail.php`
const DELETE_URL = `${API_DOMAIN}/medicine/delete_medication.php`
const LOW_STOCK_URL = `${API_DOMAIN}/medicine/get_low_stock_medications.php`
const TODAY_SCHEDULE_URL = `${API_DOMAIN}/medicine/get_today_schedule.php`
const MED_SCHEDULE_URL = `${API_DOMAIN}/medicine/get_medication_schedule.php`
const CREATE_RECORDS_URL = `${API_DOMAIN}/medicine/create_medication_records.php`

const fallbackMedicines = []
const fallbackSupplements = []

const resolveImageUrl = (url) => {
  if (!url) return ''
  if (url.startsWith(`${API_DOMAIN}/images/`)) {
    return url
  }
  if (/^https?:\/\//i.test(url)) return url
  if (url.startsWith('/images/')) {
    return `${API_DOMAIN}${url}`
  }
  if (url.startsWith('/')) return `${API_DOMAIN}${url}`
  return `${API_DOMAIN}/${url}`
}

const normalizeItem = (raw = {}, index = 0) => {
  return {
    id: Number(raw.medication_id ?? raw.id ?? index),
    name: raw.medication_name ?? raw.name ?? '',
    image: resolveImageUrl(raw.photo_url ?? raw.image ?? ''),
    eatTimes: raw.eatTimes ?? raw.eat_times ?? '',
    oneTime: raw.oneTime ?? raw.one_time ?? '',
    daily: raw.daily ?? raw.daily_times ?? '',
    timeCourse: Array.isArray(raw.timeCourse)
      ? raw.timeCourse
      : raw.time_course
        ? String(raw.time_course).split(',')
        : [],
    checked: Boolean(raw.checked),
    stockQty: raw.stock_qty ?? null,
    expiryDate: raw.expiry_date ?? '',
  }
}

export const useMedicineStore = defineStore('medicine', () => {
  const medicines = ref([])
  const supplements = ref([])
  const detail = ref(null)
  const lowStock = ref([])
  const todaySchedule = ref([])
  const scheduleItems = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const patchItemFromDetail = () => {
    if (!detail.value) return
    const updated = {
      id: detail.value.id,
      name: detail.value.name,
      image: detail.value.image,
      stockQty: detail.value.stockQty,
      expiryDate: detail.value.expiryDate,
    }
    const updateList = (listRef) => {
      const idx = listRef.value.findIndex((item) => item.id === updated.id)
      if (idx >= 0) {
        listRef.value[idx] = { ...listRef.value[idx], ...updated }
      }
    }
    updateList(medicines)
    updateList(supplements)
  }

  const removeItemById = (id) => {
    medicines.value = medicines.value.filter((item) => item.id !== id)
    supplements.value = supplements.value.filter((item) => item.id !== id)
  }

  const setItemsByType = (type, list) => {
    if (type === 'supplement') {
      supplements.value = list
    } else {
      medicines.value = list
    }
  }

  async function fetchItems(category = '藥品') {
    isLoading.value = true
    error.value = null
    try {
      const url = `${API_URL}?category=${encodeURIComponent(category)}`
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }
      const data = await res.json()
      const payload = Array.isArray(data) ? data : data?.data ?? data?.items ?? []
      if (!Array.isArray(payload)) {
        throw new Error('Invalid medicine response')
      }
      setItemsByType(
        category === '保健食品' ? 'supplement' : 'medicine',
        payload.map((item, index) => normalizeItem(item, index))
      )
    } catch (err) {
      console.error('fetchItems failed', err)
      const fallback =
        category === '保健食品' ? fallbackSupplements : fallbackMedicines
      setItemsByType(category === '保健食品' ? 'supplement' : 'medicine', fallback)
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  async function createMedication(formData) {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(CREATE_URL, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }
      return await res.json()
    } catch (err) {
      console.error('createMedication failed', err)
      error.value = err
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateMedication(formData) {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(UPDATE_URL, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }
      return await res.json()
    } catch (err) {
      console.error('updateMedication failed', err)
      error.value = err
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchDetail(medicationId) {
    if (!medicationId) return
    isLoading.value = true
    error.value = null
    try {
      const url = `${DETAIL_URL}?medication_id=${encodeURIComponent(medicationId)}`
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }
      const data = await res.json()
      const raw = data?.data ?? null
      if (!raw) {
        throw new Error('Invalid detail response')
      }
      detail.value = {
        id: Number(raw.medication_id ?? medicationId),
        name: raw.medication_name ?? '',
        note: raw.note ?? '',
        expiryDate: raw.expiry_date ?? '',
        stockQty: raw.stock_qty ?? null,
        image: resolveImageUrl(raw.photo_url ?? ''),
        isActive: raw.is_active ?? null,
        schedule: raw.schedule ?? {},
      }
    } catch (err) {
      console.error('fetchDetail failed', err)
      detail.value = null
      error.value = err
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function deleteMedication(medicationId, memberId = 1) {
    if (!medicationId) return
    isLoading.value = true
    error.value = null
    try {
      const payload = new FormData()
      payload.append('medication_id', String(medicationId))
      if (memberId) {
        payload.append('member_id', String(memberId))
      }
      const res = await fetch(DELETE_URL, {
        method: 'POST',
        credentials: 'include',
        body: payload,
      })
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }
      return await res.json()
    } catch (err) {
      console.error('deleteMedication failed', err)
      error.value = err
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchLowStock() {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(LOW_STOCK_URL, {
        method: 'GET',
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }
      const data = await res.json()
      lowStock.value = Array.isArray(data?.data) ? data.data : []
    } catch (err) {
      console.error('fetchLowStock failed', err)
      lowStock.value = []
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTodaySchedule() {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(TODAY_SCHEDULE_URL, {
        method: 'GET',
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }
      const data = await res.json()
      todaySchedule.value = Array.isArray(data?.data)
        ? data.data.map((item) => ({
            ...item,
            image: resolveImageUrl(item.photo_url ?? ''),
          }))
        : []
    } catch (err) {
      console.error('fetchTodaySchedule failed', err)
      todaySchedule.value = []
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchScheduleItems() {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(MED_SCHEDULE_URL, {
        method: 'GET',
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }
      const data = await res.json()
      scheduleItems.value = Array.isArray(data?.data)
        ? data.data.map((item) => ({
            ...item,
            image: resolveImageUrl(item.photo_url ?? ''),
            taken_today: Number(item.taken_today) === 1,
          }))
        : []
    } catch (err) {
      console.error('fetchScheduleItems failed', err)
      scheduleItems.value = []
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  async function createMedicationRecords(scheduleIds) {
    if (!Array.isArray(scheduleIds) || scheduleIds.length === 0) return
    isLoading.value = true
    error.value = null
    try {
      const payload = new FormData()
      scheduleIds.forEach((id) => payload.append('schedule_ids[]', String(id)))
      const res = await fetch(CREATE_RECORDS_URL, {
        method: 'POST',
        credentials: 'include',
        body: payload,
      })
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }
      return await res.json()
    } catch (err) {
      console.error('createMedicationRecords failed', err)
      error.value = err
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    medicines,
    supplements,
    detail,
    isLoading,
    error,
    fetchItems,
    createMedication,
    updateMedication,
    fetchDetail,
    patchItemFromDetail,
    deleteMedication,
    removeItemById,
    lowStock,
    fetchLowStock,
    todaySchedule,
    fetchTodaySchedule,
    scheduleItems,
    fetchScheduleItems,
    createMedicationRecords,
  }
})
