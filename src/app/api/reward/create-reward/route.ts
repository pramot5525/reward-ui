import { rewardServiceAPI } from '@/core/api/reward/api-client'

export type BffPostRewardMasterResponse = {
  id: number
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data } = await rewardServiceAPI.post<BffPostRewardMasterResponse>(
      '/api/v1/reward',
      body,
    )

    return Response.json(data, { status: 201 })
  } catch (e) {
    console.error('create-reward error', e)
    return Response.json('Internal error', { status: 500 })
  }
}
