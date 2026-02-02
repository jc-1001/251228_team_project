import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { publicApi } from '@/utils/publicApi'

export const useProductStore = defineStore('product', () => {
  // state
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  // action
  // 1 抓商品
  const fetchProducts = async () => {
    if(products.value.length > 0) return

    loading.value = true

    try {
      const res = await publicApi.get('shop/get_products.php')

      products.value = res.data
      // console.log('進貨成功', products.value)
    } catch(err) {
      // console.log('進貨失敗', err);
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // 2 抓商品詳情
  const fetchProductDetail = async (id) => {
    loading.value = true
    try {
      const res = await publicApi.get(`shop/get_product_detail.php?id=${id}`)
      return res.data
    } catch(err) {
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }
  
  // getter
  // 找單一商品(for商品詳情頁)
  const getProductById = (id) => {
    return products.value.find(item => item.product_id == id)
  }
  
  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    fetchProductDetail
  }
})
