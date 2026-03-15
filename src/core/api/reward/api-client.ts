import axios from 'axios'
import { SERVER_CONFIGS } from '@/configs/server-configs'
import { generateServiceToken } from '../service-token'

export const rewardServiceAPI = axios.create({
  baseURL: SERVER_CONFIGS.REWARD_SERVICE.BASE_URL,
})

rewardServiceAPI.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await generateServiceToken()}`
  return config
})
