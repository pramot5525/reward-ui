import { rewardServiceAPI } from '@/core/api/reward/api-client'

export type BffUploadImageResponse = {
  url: string
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const { data } = await rewardServiceAPI.post<BffUploadImageResponse>(
      '/bucket/image',
      formData,
    )

    return Response.json(data, { status: 200 })
  } catch (e) {
    console.error('upload-image error', e)
    return Response.json('Internal error', { status: 500 })
  }
}
