import dayjs from 'dayjs'
import { FormDataReward } from '../types/reward.types'

export const handleRewardCode = (data: FormDataReward) => {
  if (!data.rewardCodes) return undefined

  const expiredDate = `${data.endDateRewardCode} ${data.endTimeRewardCode}`
  const isoExpiredDate = dayjs(expiredDate).second(59).toISOString()
  const codes = data.rewardCodes
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean)

  return { codes, expiredDate: isoExpiredDate }
}
