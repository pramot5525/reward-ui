import { rewardServiceAPI } from '@/core/api/reward/api-client'
import { NextRequest } from 'next/server'

export type RewardDetailInfo = {
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

export type RewardDetail = {
  id: number
  redeemPoint: number
  startDate: string
  endDate: string
  state: number
  conditionBy: string
  isLimitRedeem: boolean
  countLimitRedeem: number
  tiers: string[]
  info: RewardDetailInfo
}

export type BffGetRewardDetailsResponse = RewardDetail

export async function GET(request: NextRequest) {
  try {
    const rewardId = request.nextUrl.searchParams.get('rewardId')

    const { data } = await rewardServiceAPI.get<RewardDetail>(`/api/v1/reward/${rewardId}`, {
      headers: { 'Accept-Language': 'th' },
    })

    return Response.json(data, { status: 200 })
  } catch (e) {
    console.error('reward-details error', e)
    return Response.json('Internal error', { status: 500 })
  }
}
