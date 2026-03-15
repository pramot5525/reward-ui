'use client'
import { useFormContext } from 'react-hook-form'
import type { FormDataReward } from '../types/reward.types'

type RewardUserIdsProps = {
  isAddRewardPage: boolean
}

export default function RewardUserIds({ isAddRewardPage }: RewardUserIdsProps) {
  const { getFieldState, getValues, setValue, formState } = useFormContext<FormDataReward>()

  const { error: errorCustomerIds } = getFieldState('customerIds')
  const { error: errorCustomerIdsString } = getFieldState('customerIdsString')
  const { isSubmitted } = formState

  const currentCustomerIds = getValues('currentCustomerIds').map(Number)
  const customerIds = getValues('customerIds').map(Number)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const raw = e.target.value.replace(/[\r\n]/gm, ',')
    setValue('customerIdsString', raw)

    const parsed = raw
      .trim()
      .split(',')
      .map((n) => n.trim())
      .filter((n) => /^[1-9]\d{0,6}$/.test(n))
      .map(Number)

    setValue('customerIds', parsed, { shouldValidate: true })
  }

  const errorMsg = isSubmitted
    ? errorCustomerIdsString?.message || errorCustomerIds?.message
    : undefined

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
        กรุณาระบุ User ID โดยคั่นด้วยเครื่องหมายจุลภาค (,) หรือขึ้นบรรทัดใหม่
      </div>

      <div>
        <textarea
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
            ${errorMsg ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
          rows={5}
          placeholder="เช่น 1234567, 7654321"
          defaultValue={getValues('customerIdsString')}
          onChange={handleChange}
          data-testid="userid"
        />
        {errorMsg && <p className="mt-1 text-xs text-red-500">{errorMsg}</p>}
      </div>

      {!errorCustomerIdsString && customerIds.length > 0 && (
        <p className="text-sm text-gray-600">
          User ID ใหม่:{' '}
          <span className="font-semibold text-blue-600">{customerIds.length}</span> รายการ
        </p>
      )}

      {!isAddRewardPage && currentCustomerIds.length > 0 && (
        <details className="rounded-lg border border-gray-200 p-3">
          <summary className="cursor-pointer text-sm font-medium text-gray-700">
            User ID ปัจจุบัน ({currentCustomerIds.length} รายการ)
          </summary>
          <p className="mt-2 text-xs text-gray-600">{currentCustomerIds.join(', ')}</p>
        </details>
      )}
    </div>
  )
}
