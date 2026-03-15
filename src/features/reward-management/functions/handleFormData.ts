import dayjs from 'dayjs'
import { UseFormSetError } from 'react-hook-form'
import { FormDataReward } from '../types/reward.types'

type RewardInfoPayload = {
  title: string
  subtitle: string
  description: string
  termCondition: string
  bannerUrl: string
  logoUrl: string
  isCodeDisplayed: boolean
  isQrDisplayed: boolean
  isBarcodeDisplayed: boolean
}

export type CreateRewardPayload = {
  redeemPoint: number
  startDate: string
  endDate: string
  conditionBy: string
  isLimitRedeem: boolean
  countLimitRedeem: number
  tiers: string[]
  infoTH: RewardInfoPayload
  infoEN: RewardInfoPayload
}

export type UpdateRewardPayload = {
  id: number
  redeemPoint: number
  startDate: string
  endDate: string
  isLimitRedeem: boolean
  countLimitRedeem: number
}

const validateDates = (
  data: FormDataReward,
  setError: UseFormSetError<FormDataReward>,
): boolean => {
  const start = dayjs(`${data.startDateOfPointExchange} ${data.startTimeOfPointExchange}`)
  const end = dayjs(`${data.endDateOfPointExchange} ${data.endTimeOfPointExchange}`)
  if (end.isBefore(start) || end.isSame(start)) {
    setError('startDateOfPointExchange', { message: 'ข้อมูลไม่ถูกต้อง' })
    setError('endDateOfPointExchange', { message: 'ข้อมูลไม่ถูกต้อง' })
    return false
  }
  return true
}

export const buildCreateRewardPayload = (
  data: FormDataReward,
  setError: UseFormSetError<FormDataReward>,
  bannerUrl: string,
  logoUrl: string,
): CreateRewardPayload | null => {
  if (!validateDates(data, setError)) return null

  const info: RewardInfoPayload = {
    title: data.rewardName,
    subtitle: data.rewardSubtitle ?? '',
    description: convertRGBToHex(data.rewardDescription ?? ''),
    termCondition: convertRGBToHex(data.rewardCondition),
    bannerUrl,
    logoUrl,
    isCodeDisplayed: data.isCodeDisplayed,
    isQrDisplayed: data.isQrDisplayed,
    isBarcodeDisplayed: data.isBarcodeDisplayed,
  }

  return {
    redeemPoint: Number(data.rewardPoint),
    startDate: data.startDateOfPointExchange,
    endDate: data.endDateOfPointExchange,
    conditionBy: data.conditionBy.toLowerCase(),
    isLimitRedeem: data.isLimitRedeem,
    countLimitRedeem: data.countLimitRedeem,
    tiers: data.customerTiers,
    infoTH: info,
    infoEN: info,
  }
}

export const buildUpdateRewardPayload = (
  data: FormDataReward,
  setError: UseFormSetError<FormDataReward>,
  rewardId: number,
): UpdateRewardPayload | null => {
  if (!validateDates(data, setError)) return null

  return {
    id: rewardId,
    redeemPoint: Number(data.rewardPoint),
    startDate: data.startDateOfPointExchange,
    endDate: data.endDateOfPointExchange,
    isLimitRedeem: data.isLimitRedeem,
    countLimitRedeem: data.countLimitRedeem,
  }
}

const convertRGBToHex = (htmlString: string) =>
  htmlString.replace(
    /rgb\((\d+),\s*(\d+),\s*(\d+)\)/g,
    (_match, r: string, g: string, b: string) => {
      const toHex = (n: string) => parseInt(n).toString(16).padStart(2, '0')
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`
    },
  )
