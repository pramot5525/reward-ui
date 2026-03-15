'use client'
import { ChangeEvent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FormDataReward } from '../types/reward.types'
import { RewardConditionBy } from '../types/reward.types'
import type { TierDetailResponse } from '@/app/api/loyalty/tier-lists/route'
import RewardTiers from './RewardTiers'
import RewardUserIds from './RewardUserIds'

type RewardInfoTabsProps = {
  rewardTiers: TierDetailResponse[]
  handleChangeTab: () => void
  isAddRewardPage: boolean
}

function FieldRow({
  label,
  required,
  children,
  error,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  error?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="bg-gray-100 px-6 py-3">
      <p className="text-sm font-bold text-gray-700">{title}</p>
    </div>
  )
}

export default function RewardInfoTabs({
  rewardTiers,
  handleChangeTab,
  isAddRewardPage,
}: RewardInfoTabsProps) {
  const {
    control,
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<FormDataReward>()

  watch('conditionBy')
  watch('isLimitRedeem')

  const conditionBy = getValues('conditionBy')
  const isLimitRedeem = getValues('isLimitRedeem')

  const getImageURL = (field: keyof FormDataReward) => {
    const file = getValues(field)
    if (file instanceof File) return URL.createObjectURL(file)
    if (typeof file === 'string') return file
    return ''
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 px-6 py-4">
          <span className="text-lg">📄</span>
          <h2 className="text-base font-semibold text-gray-800">ข้อมูลรางวัล</h2>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <FieldRow label="ชื่อรางวัล" required error={errors.rewardName?.message}>
            <input
              {...register('rewardName')}
              type="text"
              placeholder="ชื่อรางวัล (ไม่เกิน 50 ตัวอักษร)"
              maxLength={50}
              data-testid="reward-name"
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                ${errors.rewardName ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
          </FieldRow>

          <FieldRow label="คำบรรยายรางวัล (ไม่บังคับ)" error={errors.rewardSubtitle?.message}>
            <input
              {...register('rewardSubtitle')}
              type="text"
              placeholder="คำบรรยายสั้น"
              data-testid="description"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </FieldRow>

          <FieldRow label="คะแนนแลกรางวัล" required error={errors.rewardPoint?.message}>
            <input
              {...register('rewardPoint')}
              type="number"
              placeholder="0 - 99999"
              data-testid="point"
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                ${errors.rewardPoint ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
          </FieldRow>
        </div>

        <SectionTitle title="เงื่อนไขการแลก" />

        <div className="flex flex-col gap-5 p-6">
          <div className="grid grid-cols-2 gap-4">
            <FieldRow label="วันที่เริ่มต้น" required error={errors.startDateOfPointExchange?.message}>
              <input
                {...register('startDateOfPointExchange')}
                type="date"
                data-testid="start-date"
                className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${errors.startDateOfPointExchange ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
            </FieldRow>
            <FieldRow label="เวลาเริ่มต้น" required error={errors.startTimeOfPointExchange?.message}>
              <input
                {...register('startTimeOfPointExchange')}
                type="time"
                data-testid="start-time"
                className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${errors.startTimeOfPointExchange ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
            </FieldRow>
            <FieldRow label="วันที่สิ้นสุด" required error={errors.endDateOfPointExchange?.message}>
              <input
                {...register('endDateOfPointExchange')}
                type="date"
                data-testid="end-date"
                className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${errors.endDateOfPointExchange ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
            </FieldRow>
            <FieldRow label="เวลาสิ้นสุด" required error={errors.endTimeOfPointExchange?.message}>
              <input
                {...register('endTimeOfPointExchange')}
                type="time"
                data-testid="end-time"
                className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${errors.endTimeOfPointExchange ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
            </FieldRow>
          </div>
        </div>

        <SectionTitle title="รายละเอียดและเงื่อนไข" />

        <div className="flex flex-col gap-5 p-6">
          <FieldRow label="รายละเอียดรางวัล (ไม่บังคับ)" error={errors.rewardDescription?.message}>
            <textarea
              {...register('rewardDescription')}
              rows={4}
              placeholder="รายละเอียดรางวัล"
              data-testid="reward-detail"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </FieldRow>

          <FieldRow label="เงื่อนไขการแลกรางวัล" required error={errors.rewardCondition?.message}>
            <textarea
              {...register('rewardCondition')}
              rows={4}
              placeholder="เงื่อนไข"
              data-testid="reward-condition"
              className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
                ${errors.rewardCondition ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
          </FieldRow>

          <FieldRow label="ตัวเลือกการแสดงผล (ไม่บังคับ)">
            <div className="flex gap-5">
              <Controller
                name="isQrDisplayed"
                control={control}
                render={({ field: { ref: _ref, value, ...field } }) => (
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      {...field}
                      checked={value}
                      onChange={field.onChange}
                      data-testid="qrcode"
                      className="h-4 w-4 rounded"
                    />
                    QR Code
                  </label>
                )}
              />
              <Controller
                name="isBarcodeDisplayed"
                control={control}
                render={({ field: { ref: _ref, value, ...field } }) => (
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      {...field}
                      checked={value}
                      onChange={field.onChange}
                      data-testid="barcode"
                      className="h-4 w-4 rounded"
                    />
                    Barcode
                  </label>
                )}
              />
            </div>
          </FieldRow>

          <FieldRow label="เงื่อนไขผู้รับรางวัล" required>
            <Controller
              name="conditionBy"
              control={control}
              render={({ field: { ref: _ref, value, ...field } }) => (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-5">
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="radio"
                        {...field}
                        disabled={!isAddRewardPage}
                        value={RewardConditionBy.TIER}
                        checked={value === RewardConditionBy.TIER}
                        data-testid="tier"
                      />
                      ตามระดับสมาชิก
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="radio"
                        {...field}
                        disabled={!isAddRewardPage}
                        value={RewardConditionBy.USER_ID}
                        checked={value === RewardConditionBy.USER_ID}
                        data-testid="user"
                      />
                      ตาม User ID
                    </label>
                  </div>

                  {conditionBy === RewardConditionBy.TIER && <RewardTiers tiers={rewardTiers} />}
                  {conditionBy === RewardConditionBy.USER_ID && (
                    <RewardUserIds isAddRewardPage={isAddRewardPage} />
                  )}
                </div>
              )}
            />
          </FieldRow>

          <FieldRow label="จำกัดการแลก" required>
            <Controller
              name="isLimitRedeem"
              control={control}
              render={({ field: { ref: _ref, value, ...field } }) => (
                <div className="flex items-center gap-5">
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="radio"
                      {...field}
                      disabled={!isAddRewardPage}
                      value="false"
                      checked={!value}
                      onChange={(e) => field.onChange(e.target.value === 'true')}
                      data-testid="unlimited"
                    />
                    ไม่จำกัด
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="radio"
                      {...field}
                      disabled={!isAddRewardPage}
                      value="true"
                      checked={value}
                      onChange={(e) => field.onChange(e.target.value === 'true')}
                      data-testid="limited"
                    />
                    จำกัด
                  </label>
                  {isLimitRedeem && (
                    <Controller
                      name="countLimitRedeem"
                      control={control}
                      render={({ field: limitField }) => (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            {...limitField}
                            min={1}
                            max={999}
                            disabled={!isAddRewardPage}
                            data-testid="countlimit"
                            className="w-24 rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                          />
                          <span className="text-sm text-gray-600">ครั้ง/คน</span>
                        </div>
                      )}
                    />
                  )}
                </div>
              )}
            />
          </FieldRow>
        </div>
      </div>

      {/* Image Section */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 px-6 py-4">
          <span className="text-lg">🖼️</span>
          <h2 className="text-base font-semibold text-gray-800">รูปภาพรางวัล</h2>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <FieldRow
            label="รูป Banner"
            required
            error={errors.rewardImage?.message as string | undefined}
          >
            <div className="flex flex-col gap-2">
              {getImageURL('rewardImage') && (
                <img
                  src={getImageURL('rewardImage')}
                  alt="banner preview"
                  className="h-[136px] w-[240px] rounded-lg object-cover"
                />
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                data-testid="banner"
                className="text-sm"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0]
                  setValue('rewardImage', file ?? '')
                }}
              />
              <p className="text-xs text-gray-500">JPG, JPEG, PNG — สูงสุด 2 MB (1170×876 px)</p>
            </div>
          </FieldRow>

          <FieldRow
            label="โลโก้รางวัล"
            required
            error={errors.rewardLogo?.message as string | undefined}
          >
            <div className="flex flex-col gap-2">
              {getImageURL('rewardLogo') && (
                <img
                  src={getImageURL('rewardLogo')}
                  alt="logo preview"
                  className="h-[74px] w-[74px] rounded-lg object-cover"
                />
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                data-testid="logo"
                className="text-sm"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0]
                  setValue('rewardLogo', file ?? '')
                }}
              />
              <p className="text-xs text-gray-500">JPG, JPEG, PNG — สูงสุด 1 MB (128×128 px)</p>
            </div>
          </FieldRow>
        </div>
      </div>

      <div className="flex justify-end pb-6">
        <button
          type="button"
          onClick={handleChangeTab}
          data-testid="reward-code-btn"
          className="flex items-center gap-2 rounded-xl border border-blue-500 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100"
        >
          โค้ดรางวัล →
        </button>
      </div>
    </div>
  )
}
