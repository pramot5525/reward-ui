import { bffAPI } from './api-client'

export const bffFetcher = async <T = unknown>(path: string): Promise<T> => {
  const res = await bffAPI.get<T>(path)
  return res.data
}
