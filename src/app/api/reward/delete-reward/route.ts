import { rewardServiceAPI } from '@/core/api/reward/api-client'
import { NextRequest } from 'next/server'

export type BffRewardDeleteRewardRequest = {
  rewardId: number
}

export async function DELETE(request: NextRequest) {
  try {
    const { rewardId } = (await request.json()) as BffRewardDeleteRewardRequest

    await rewardServiceAPI.delete(`/api/v1/reward/${rewardId}`)

    return Response.json(null, { status: 200 })
  } catch (e) {
    console.error('delete-reward error', e)
    return Response.json('Internal error', { status: 500 })
  }
}
