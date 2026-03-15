import useSWR from 'swr'
import { bffFetcher } from '@/core/api/bff/fetcher'
import type { BffGetRewardUserResponse } from '@/app/api/reward/reward-user/route'

export const useGetRewardUser = (rewardId: string, onSuccess?: (ids: string[]) => void) => {
  const { data, isLoading, error } = useSWR<BffGetRewardUserResponse>(
    rewardId ? `/api/reward/reward-user?rewardId=${rewardId}` : null,
    bffFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      onSuccess: (res) => {
        onSuccess?.(res.customerIds ?? [])
      },
    },
  )

  return { data, isLoading, error }
}
