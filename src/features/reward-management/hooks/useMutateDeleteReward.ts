import useSWRMutation from 'swr/mutation'
import { bffAPI } from '@/core/api/bff/api-client'
import type { BffRewardDeleteRewardRequest } from '@/app/api/reward/delete-reward/route'

export const useMutateDeleteReward = (
  rewardId: number,
  onSuccess: () => void,
  onError: () => void,
) => {
  const body: BffRewardDeleteRewardRequest = { rewardId }

  const { trigger, isMutating } = useSWRMutation(
    '/api/reward/delete-reward',
    (path: string) => bffAPI.delete(path, { data: body }),
    { onSuccess, onError },
  )

  return { trigger, isMutating }
}
