'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FormDataReward } from '@/features/reward-management/types/reward.types'
import { RewardConditionBy } from '@/features/reward-management/types/reward.types'
import { rewardInfoSchema, updateRewardInfoSchema } from '@/features/reward-management/reward.schema'
import type { Resolver } from 'react-hook-form'
import { useGetRewardDetail } from '@/features/reward-management/hooks/useGetRewardDetail'
import { useGetRewardCodeList } from '@/features/reward-management/hooks/useGetRewardCodeList'
import { useGetRewardUser } from '@/features/reward-management/hooks/useGetRewardUser'
import { handleSubmitRewardForm } from '@/features/reward-management/functions/handleSubmitReward'
import RewardInfoTabs from '@/features/reward-management/components/RewardInfoTabs'
import RewardCodeTabs from '@/features/reward-management/components/RewardCodeTabs'
import { bffAPI } from '@/core/api/bff/api-client'
import type { BffLoyaltyGetTierListResponse } from '@/app/api/loyalty/tier-lists/route'

const defaultValues: FormDataReward = {
  rewardName: '',
  rewardSubtitle: '',
  rewardPoint: '',
  startDateOfPointExchange: '',
  startTimeOfPointExchange: '',
  endDateOfPointExchange: '',
  endTimeOfPointExchange: '',
  rewardDescription: '',
  rewardCondition: '',
  isCodeDisplayed: false,
  isQrDisplayed: true,
  isBarcodeDisplayed: true,
  rewardImage: '',
  rewardLogo: '',
  rewardCodes: '',
  endDateRewardCode: '',
  endTimeRewardCode: '',
  conditionBy: RewardConditionBy.TIER,
  customerTiers: [],
  customerIds: [],
  customerIdsString: '',
  currentCustomerIds: [],
  isLimitRedeem: false,
  countLimitRedeem: 1,
}

export default function RewardManagementFormPage() {
  const params = useParams()
  const router = useRouter()
  const rewardId = params.id as string
  const isAddRewardPage = rewardId === 'add-reward'

  const [activeTab, setActiveTab] = useState(0)
  const [rewardTiers, setRewardTiers] = useState<BffLoyaltyGetTierListResponse>()
  const [submitError, setSubmitError] = useState('')

  const schema = isAddRewardPage ? rewardInfoSchema : updateRewardInfoSchema
  const methods = useForm<FormDataReward>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as unknown as Resolver<FormDataReward>,
    defaultValues,
  })

  const { isLoading } = useGetRewardDetail(
    isAddRewardPage ? '' : rewardId,
    (data) => methods.reset((prev) => ({ ...data, currentCustomerIds: prev.currentCustomerIds })),
  )

  const { isLoading: isLoadingUser } = useGetRewardUser(
    isAddRewardPage ? '' : rewardId,
    (ids) => methods.reset((prev) => ({ ...prev, currentCustomerIds: ids })),
  )

  const { rewardCodeList, isLoading: isLoadingCodes } = useGetRewardCodeList(
    isAddRewardPage ? '' : rewardId,
  )

  useEffect(() => {
    void bffAPI.get<BffLoyaltyGetTierListResponse>('/api/loyalty/tier-lists').then(({ data }) => {
      setRewardTiers(data)
    })
  }, [])

  const onSubmit: SubmitHandler<FormDataReward> = async (data) => {
    try {
      setSubmitError('')
      await handleSubmitRewardForm(data, methods.setError, rewardId, router.push)
    } catch {
      setSubmitError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }

  const onError = () => {
    setSubmitError('กรุณากรอกข้อมูลให้ครบถ้วน')
  }

  const isPageLoading = isLoading || isLoadingUser || isLoadingCodes

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-10 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/reward-management')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              จัดการรางวัล
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-sm font-medium text-gray-900">
              {isAddRewardPage ? 'เพิ่มรางวัล' : 'แก้ไขรางวัล'}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              disabled={methods.formState.isSubmitting}
              className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
              data-testid="cancel-btn"
            >
              ยกเลิก
            </button>
            <button
              onClick={methods.handleSubmit(onSubmit, onError)}
              disabled={methods.formState.isSubmitting}
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40"
              data-testid="save-btn"
            >
              {methods.formState.isSubmitting ? 'กำลังบันทึก...' : 'บันทึกและเผยแพร่'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-10">
          <div className="flex">
            {['ข้อมูลรางวัล', 'โค้ดรางวัล'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-3 text-sm font-medium transition-colors
                  ${activeTab === i
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'}`}
                data-testid={i === 0 ? 'reward-info-tab' : 'reward-code-tab'}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit, onError)}
          className="flex-1 overflow-y-auto bg-gray-50"
        >
          <div className="mx-auto max-w-6xl px-10 py-6">
            {submitError && (
              <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                {submitError}
              </div>
            )}
            {isPageLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              </div>
            ) : rewardTiers?.data ? (
              <>
                {activeTab === 0 ? (
                  <RewardInfoTabs
                    rewardTiers={rewardTiers.data}
                    handleChangeTab={() => setActiveTab(1)}
                    isAddRewardPage={isAddRewardPage}
                  />
                ) : (
                  <RewardCodeTabs
                    handleChangeTab={() => setActiveTab(0)}
                    isAddRewardPage={isAddRewardPage}
                    rewardCodeList={rewardCodeList}
                  />
                )}
              </>
            ) : (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
