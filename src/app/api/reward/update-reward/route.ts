import { rewardServiceAPI } from '@/core/api/reward/api-client'

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    const { data } = await rewardServiceAPI.put<Record<string, never>>(
      '/api/v1/reward',
      body,
    )

    return Response.json(data, { status: 200 })
  } catch (e) {
    console.error('update-reward error', e)
    return Response.json('Internal error', { status: 500 })
  }
}
