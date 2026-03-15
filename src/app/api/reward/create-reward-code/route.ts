import { rewardServiceAPI } from '@/core/api/reward/api-client'

export type BffRewardCreateRewardCodeRequest = {
  rewardId: number
  codes: string[]
  expiredDate: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BffRewardCreateRewardCodeRequest

    const { data } = await rewardServiceAPI.post<Record<string, never>>(
      '/api/v1/reward/code',
      body,
    )

    return Response.json(data, { status: 201 })
  } catch (e) {
    console.error('create-reward-code error', e)
    return Response.json('Internal error', { status: 500 })
  }
}
