import useSWR from 'swr'
import { bffFetcher } from '@/core/api/bff/fetcher'
import type { BffGetRewardCodeListResponse } from '@/app/api/reward/reward-code-lists/route'

export const useGetRewardCodeList = (rewardId: string) => {
  const { data, isLoading, error } = useSWR<BffGetRewardCodeListResponse>(
    rewardId ? `/api/reward/reward-code-lists?rewardId=${rewardId}` : null,
    bffFetcher,
    { shouldRetryOnError: false, refreshInterval: 0 },
  )

  return { rewardCodeList: data, isLoading, error }
}
