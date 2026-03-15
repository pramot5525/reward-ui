'use client'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import type { FormDataReward } from '../types/reward.types'
import type { TierDetailResponse } from '@/app/api/loyalty/tier-lists/route'

type RewardTiersProps = {
  tiers: TierDetailResponse[]
}

export default function RewardTiers({ tiers }: RewardTiersProps) {
  const { getValues, setValue, watch, getFieldState, register } = useFormContext<FormDataReward>()

  register('customerTiers')
  watch('customerTiers')

  const selectedCodes = getValues('customerTiers') ?? []
  const { error } = getFieldState('customerTiers')

  return (
    <div className="flex flex-wrap gap-4">
      {tiers.map(({ code, imageUrl, name: tierName }, idx) => {
        const selected = selectedCodes.includes(code)
        return (
          <label
            key={code}
            className={`flex w-[220px] cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors
              ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'}
              ${error ? 'border-red-500' : ''}`}
            data-testid={`tier-${idx + 1}`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selected}
              onChange={() => {
                setValue(
                  'customerTiers',
                  selected ? selectedCodes.filter((s) => s !== code) : [...selectedCodes, code],
                )
              }}
            />
            <Image alt={tierName} src={imageUrl} width={56} height={38} unoptimized />
            <span className="text-sm font-medium text-gray-800">{tierName}</span>
          </label>
        )
      })}
      {error?.message && <p className="w-full text-xs text-red-500">{error.message}</p>}
    </div>
  )
}
