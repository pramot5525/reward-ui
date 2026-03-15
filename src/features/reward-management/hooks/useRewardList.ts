import useSWR from 'swr'
import { bffFetcher } from '@/core/api/bff/fetcher'
import type { BffGetRewardListResponse } from '@/app/api/reward/reward-list/route'

export const useRewardList = (pageSize: number, page: number) => {
  const { data, isLoading, error, mutate } = useSWR<BffGetRewardListResponse>(
    `/api/reward/reward-list?limit=${pageSize}&page=${page}`,
    bffFetcher,
  )

  return {
    rewardList: data?.items,
    totalCount: data?.total ?? 0,
    isLoading,
    error,
    mutate,
  }
}
