import type { BffRewardCreateRewardCodeRequest } from '@/app/api/reward/create-reward-code/route'
import type { BffRewardCreateRewardUserRequest } from '@/app/api/reward/create-reward-user/route'

export type FormDataReward = {
  rewardName: string
  rewardSubtitle: string
  rewardPoint: string
  startDateOfPointExchange: string
  startTimeOfPointExchange: string
  endDateOfPointExchange: string
  endTimeOfPointExchange: string
  rewardDescription: string
  rewardCondition: string
  isCodeDisplayed: boolean
  isQrDisplayed: boolean
  isBarcodeDisplayed: boolean
  rewardImage: File | string
  rewardLogo: File | string
  rewardCodes: string
  endDateRewardCode: string
  endTimeRewardCode: string
  conditionBy: 'TIER' | 'USER_ID'
  customerTiers: string[]
  customerIds: number[]
  customerIdsString: string
  currentCustomerIds: string[]
  isLimitRedeem: boolean
  countLimitRedeem: number
}

export type RewardCodeDataRes = {
  codes: string[]
  expiredDate: string
}

export type RewardUserDataRes = {
  customerIds: string[]
  rewardId?: number
}

export type CreateRewardMasterProps = {
  formData: FormData
  rewardCodeData?: RewardCodeDataRes
  rewardUserData?: RewardUserDataRes
  router: { push: (path: string) => void }
}

export type UpdateRewardMasterProps = {
  formData: FormData
  rewardCodeData?: RewardCodeDataRes
  rewardUserData?: RewardUserDataRes
  rewardId: string
  router: { push: (path: string) => void }
}

export type CreateRewardCodeProps = {
  payload?: BffRewardCreateRewardCodeRequest
}

export type CreateRewardUserProps = {
  payload?: BffRewardCreateRewardUserRequest
}

export const RewardConditionBy = {
  TIER: 'TIER',
  USER_ID: 'USER_ID',
} as const
