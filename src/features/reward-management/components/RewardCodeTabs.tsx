'use client'
import { useFormContext } from 'react-hook-form'
import type { FormDataReward } from '../types/reward.types'
import type { RewardCodeListResponse } from '@/app/api/reward/reward-code-lists/route'

type RewardCodeTabsProps = {
  handleChangeTab: () => void
  isAddRewardPage: boolean
  rewardCodeList?: RewardCodeListResponse[]
}

function FieldRow({
  label,
  required,
  description,
  children,
  error,
}: {
  label: string
  required?: boolean
  description?: string
  children: React.ReactNode
  error?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default function RewardCodeTabs({
  handleChangeTab,
  isAddRewardPage,
  rewardCodeList,
}: RewardCodeTabsProps) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormDataReward>()

  return (
    <div className="flex max-w-[992px] flex-col gap-6">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 px-6 py-4">
          <span className="text-lg">🎟️</span>
          <h2 className="text-base font-semibold text-gray-800">โค้ดรางวัล</h2>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
            โค้ดจะถูกใช้งานได้เพียงครั้งเดียวเท่านั้น
          </div>

          <FieldRow
            label={isAddRewardPage ? 'โค้ดรางวัล' : 'เพิ่มโค้ดรางวัล'}
            required={isAddRewardPage}
            description={!isAddRewardPage ? 'ไม่บังคับ' : undefined}
            error={errors.rewardCodes?.message}
          >
            <textarea
              {...register('rewardCodes')}
              rows={4}
              placeholder="CODE01, CODE02, CODE03"
              data-testid="reward-code"
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                ${errors.rewardCodes ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
          </FieldRow>

          <div className="grid grid-cols-2 gap-4">
            <FieldRow
              label="วันหมดอายุโค้ด"
              required={isAddRewardPage}
              description={!isAddRewardPage ? 'สำหรับโค้ดใหม่เท่านั้น' : undefined}
              error={errors.endDateRewardCode?.message}
            >
              <input
                {...register('endDateRewardCode')}
                type="date"
                data-testid="expired-date"
                className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${errors.endDateRewardCode ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
            </FieldRow>
            <FieldRow
              label="เวลาหมดอายุโค้ด"
              required={isAddRewardPage}
              error={errors.endTimeRewardCode?.message}
            >
              <input
                {...register('endTimeRewardCode')}
                type="time"
                data-testid="expired-time"
                className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${errors.endTimeRewardCode ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
            </FieldRow>
          </div>

          {rewardCodeList && rewardCodeList.length > 0 && (
            <FieldRow label="โค้ดที่มีอยู่แล้ว" description="ไม่สามารถแก้ไขได้">
              <details className="rounded-lg border border-gray-200 p-3">
                <summary
                  className="cursor-pointer text-sm font-medium text-gray-700"
                  data-testid="list-reward-code"
                >
                  โค้ดทั้งหมด ({rewardCodeList.length} รายการ)
                </summary>
                <p className="mt-2 text-xs text-gray-600">
                  {rewardCodeList.map((c) => c.code).join(', ')}
                </p>
              </details>
            </FieldRow>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={handleChangeTab}
          disabled={isSubmitting}
          data-testid="reward-info-btn"
          className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
        >
          ← ข้อมูลรางวัล
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          data-testid="submit-btn"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-40"
        >
          {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกและเผยแพร่'}
        </button>
      </div>
    </div>
  )
}
