import { UseFormSetError } from 'react-hook-form'
import { FormDataReward } from '../types/reward.types'
import { buildCreateRewardPayload, buildUpdateRewardPayload } from './handleFormData'
import { handleRewardCode } from './handleRewardCode'
import { bffAPI } from '@/core/api/bff/api-client'
import type { BffPostRewardMasterResponse } from '@/app/api/reward/create-reward/route'
import type { BffRewardCreateRewardCodeRequest } from '@/app/api/reward/create-reward-code/route'
import type { BffRewardCreateRewardUserRequest } from '@/app/api/reward/create-reward-user/route'
import type { BffUploadImageResponse } from '@/app/api/reward/upload-image/route'
import { AxiosResponse } from 'axios'

const uploadImageIfFile = async (image: File | string): Promise<string> => {
  if (typeof image === 'string') return image
  const fd = new FormData()
  fd.append('file', image)
  const res = await bffAPI.post<BffUploadImageResponse>('/api/reward/upload-image', fd)
  return res.data.url
}

export const handleSubmitRewardForm = async (
  data: FormDataReward,
  setError: UseFormSetError<FormDataReward>,
  rewardId: string,
  push: (path: string) => void,
) => {
  data.isCodeDisplayed = true

  const [bannerUrl, logoUrl] = await Promise.all([
    uploadImageIfFile(data.rewardImage),
    uploadImageIfFile(data.rewardLogo),
  ])

  const rewardCodeData = handleRewardCode(data)
  const rewardUserData = {
    customerIds: data.customerIds.map((id) => String(id)),
  }

  const isAdd = rewardId === 'add-reward'

  try {
    if (isAdd) {
      const payload = buildCreateRewardPayload(data, setError, bannerUrl, logoUrl)
      if (!payload) return

      const res: AxiosResponse<BffPostRewardMasterResponse> = await bffAPI.post(
        '/api/reward/create-reward',
        payload,
      )
      const newRewardId = res.data.id

      if (rewardCodeData) {
        await createRewardCode({ ...rewardCodeData, rewardId: newRewardId })
      }
      if (rewardUserData.customerIds.length) {
        await createRewardUser({ rewardId: newRewardId, customerIds: rewardUserData.customerIds })
      }
    } else {
      const payload = buildUpdateRewardPayload(data, setError, Number(rewardId))
      if (!payload) return

      await bffAPI.put('/api/reward/update-reward', payload)

      const rewardIdNumber = Number(rewardId)
      if (rewardCodeData) {
        await createRewardCode({ ...rewardCodeData, rewardId: rewardIdNumber })
      }
      if (rewardUserData.customerIds.length) {
        await createRewardUser({ rewardId: rewardIdNumber, customerIds: rewardUserData.customerIds })
      }
    }

    push('/reward-management')
  } catch {
    throw new Error('Submit failed')
  }
}

const createRewardCode = (payload: BffRewardCreateRewardCodeRequest) =>
  bffAPI.post('/api/reward/create-reward-code', payload)

const createRewardUser = (payload: BffRewardCreateRewardUserRequest) =>
  bffAPI.post('/api/reward/create-reward-user', payload)
