import { rewardServiceAPI } from '@/core/api/reward/api-client'
import { NextRequest } from 'next/server'

export type RewardUser = {
  rewardId: number
  customerIds?: string[]
}

export type BffGetRewardUserResponse = RewardUser

export async function GET(request: NextRequest) {
  try {
    const rewardId = request.nextUrl.searchParams.get('rewardId')

    const { data } = await rewardServiceAPI.get<RewardUser>(
      `/api/v1/reward/user?rewardId=${rewardId}`,
    )

    return Response.json(data, { status: 200 })
  } catch (e) {
    console.error('reward-user error', e)
    return Response.json('Internal error', { status: 500 })
  }
}
