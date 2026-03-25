import { rewardServiceAPI } from '@/core/api/reward/api-client'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export type RewardListItemInfo = {
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

export type RewardListResponse = {
  id: number
  redeemPoint: number
  startDate: string
  endDate: string
  state: number
  conditionBy: string
  isLimitRedeem: boolean
  countLimitRedeem: number
  info: RewardListItemInfo
}

export type BffGetRewardListResponse = {
  items: RewardListResponse[]
  total: number
  page: number
  limit: number
}

export async function GET(request: NextRequest) {
  try {
    const { data } = await rewardServiceAPI.get<BffGetRewardListResponse>('/api/v1/reward/list', {
      params: request.nextUrl.searchParams,
      headers: {
        'Accept-Language': request.headers.get('Accept-Language') ?? 'th',
      },
    })

    return Response.json(data, { status: 200 })
  } catch (e) {
    console.error('reward-list error', e)
    return Response.json('Internal error', { status: 500 })
  }
}
