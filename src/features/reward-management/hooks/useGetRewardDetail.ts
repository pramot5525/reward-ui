import useSWR from 'swr'
import { bffFetcher } from '@/core/api/bff/fetcher'
import type { BffGetRewardDetailsResponse, RewardDetail } from '@/app/api/reward/reward-details/route'
import type { FormDataReward } from '../types/reward.types'
import { RewardConditionBy } from '../types/reward.types'

const mapRewardDetailFields = (data: RewardDetail): FormDataReward => ({
  rewardName: data.info.title,
  rewardSubtitle: data.info.subtitle,
  rewardPoint: data.redeemPoint.toString(),
  startDateOfPointExchange: data.startDate,
  startTimeOfPointExchange: '00:00',
  endDateOfPointExchange: data.endDate,
  endTimeOfPointExchange: '23:59',
  rewardDescription: data.info.description,
  rewardCondition: data.info.termCondition,
  isCodeDisplayed: data.info.isCodeDisplayed,
  isQrDisplayed: data.info.isQrDisplayed,
  isBarcodeDisplayed: data.info.isBarcodeDisplayed,
  rewardImage: data.info.bannerUrl,
  rewardLogo: data.info.logoUrl,
  rewardCodes: '',
  endDateRewardCode: '',
  endTimeRewardCode: '',
  conditionBy: (data.conditionBy.toUpperCase() as 'TIER' | 'USER_ID') ?? RewardConditionBy.TIER,
  customerTiers: data.tiers ?? [],
  customerIds: [],
  currentCustomerIds: [],
  customerIdsString: '',
  isLimitRedeem: data.isLimitRedeem,
  countLimitRedeem: data.countLimitRedeem,
})

export const useGetRewardDetail = (
  rewardId: string,
  onSuccess?: (data: FormDataReward) => void,
) => {
  const { data, isLoading, error } = useSWR<BffGetRewardDetailsResponse>(
    rewardId ? `/api/reward/reward-details?rewardId=${rewardId}` : null,
    bffFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      onSuccess: (res) => {
        onSuccess?.(mapRewardDetailFields(res))
      },
    },
  )

  const rewardDetail = data && mapRewardDetailFields(data)

  return { rewardDetail, isLoading, error }
}
