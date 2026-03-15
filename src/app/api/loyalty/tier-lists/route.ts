import { rewardServiceAPI } from '@/core/api/reward/api-client'

export const dynamic = 'force-dynamic'

export type TierDetailResponse = {
  id: number
  code: string
  name: string
  imageUrl: string
}

export type BffLoyaltyGetTierListResponse = {
  meta: { totalCount: number }
  data: TierDetailResponse[]
}

export async function GET() {
  try {
    const { data } = await rewardServiceAPI.get<BffLoyaltyGetTierListResponse>('/api/public/tiers')

    return Response.json(data, { status: 200 })
  } catch (e) {
    console.error('tier-lists error', e)
    return Response.json('Internal error', { status: 500 })
  }
}
