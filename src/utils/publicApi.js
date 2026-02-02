import axios from 'axios'
import { useLoadingStore } from '@/stores/loading';

export const base = import.meta.env.BASE_URL

// 攔截器
const setupInterceptors = (instance) => {
    instance.interceptors.request.use((config) => {
        const loadingStore = useLoadingStore()
        loadingStore.show() //發送loading+1
        return config
    }, (error) => {
        const loadingStore = useLoadingStore()
        loadingStore.hide()
        return Promise.reject(error)
    })

    instance.interceptors.response.use(
        (response) => {
            const loadingStore = useLoadingStore();
            loadingStore.hide();
            return response;
        },
        (error) => {
            const loadingStore = useLoadingStore()
            loadingStore.hide()
            return Promise.reject(error)
        }
    );
};


export const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN,
    timeout: 5000
})
setupInterceptors(publicApi);