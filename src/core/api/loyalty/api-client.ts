import axios from 'axios'
import { SERVER_CONFIGS } from '@/configs/server-configs'
import { generateServiceToken } from '../service-token'

export const loyaltyServiceAPI = axios.create({
  baseURL: SERVER_CONFIGS.LOYALTY_SERVICE.BASE_URL,
})

loyaltyServiceAPI.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await generateServiceToken()}`
  return config
})
