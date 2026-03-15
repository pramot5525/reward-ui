import { rewardServiceAPI } from '@/core/api/reward/api-client'
import { NextRequest } from 'next/server'

export type RewardCodeListResponse = {
  id: number
  code: string
  isAvailable: boolean
  expiredDate: string
}

export type BffGetRewardCodeListResponse = RewardCodeListResponse[]

export async function GET(request: NextRequest) {
  try {
    const { data } = await rewardServiceAPI.get<RewardCodeListResponse[]>(
      '/api/v1/reward/code',
      { params: request.nextUrl.searchParams },
    )

    return Response.json(data, { status: 200 })
  } catch (e) {
    console.error('reward-code-lists error', e)
    return Response.json('Internal error', { status: 500 })
  }
}
