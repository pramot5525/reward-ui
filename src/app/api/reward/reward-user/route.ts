import { rewardServiceAPI } from '@/core/api/reward/api-client'
import { isAxiosError } from 'axios'
import { NextRequest } from 'next/server'

export type RewardUser = {
  rewardId: number
  customerIds?: string[]
}

export type BffGetRewardUserResponse = RewardUser

export async function GET(request: NextRequest) {
  try {
    const rewardId = request.nextUrl.searchParams.get('rewardId')

    if (!rewardId) {
      return Response.json({ error: 'rewardId is required' }, { status: 400 })
    }

    const { data } = await rewardServiceAPI.get<RewardUser>(
      `/api/v1/reward/user?rewardId=${rewardId}`,
    )

    return Response.json(data, { status: 200 })
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      if (e.response.status === 400) {
        return Response.json([], { status: 200 })
      }
      return Response.json(e.response.data, { status: e.response.status })
    }
    console.error('reward-user error', e)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
