import { rewardServiceAPI } from '@/core/api/reward/api-client'

export type BffRewardCreateRewardUserRequest = {
  rewardId: number
  customerIds: string[]
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BffRewardCreateRewardUserRequest

    const { data } = await rewardServiceAPI.post<Record<string, never>>(
      '/api/v1/reward/user',
      body,

    )

    return Response.json(data, { status: 201 })
  } catch (e) {
    console.error('create-reward-user error', e)
    return Response.json('Internal error', { status: 500 })
  }
}
