'use client'
import { useState } from 'react'
import Link from 'next/link'
import { mutate } from 'swr'
import { useRewardList } from '@/features/reward-management/hooks/useRewardList'
import { useMutateDeleteReward } from '@/features/reward-management/hooks/useMutateDeleteReward'
import RewardList from '@/features/reward-management/components/RewardList'
import RewardEmptyState from '@/features/reward-management/components/RewardEmptyState'
import DeleteRewardModal from '@/features/reward-management/components/DeleteRewardModal'

export default function RewardManagementListPage() {
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState({ id: 0, name: '' })

  const { rewardList, totalCount, isLoading } = useRewardList(pageSize, currentPage)
  const totalPage = Math.ceil(totalCount / pageSize)

  const handleDeleteSuccess = () => {
    setIsModalOpen(false)
    void mutate(`/api/reward/reward-list?limit=${pageSize}&page=${currentPage}`)
  }

  const handleDeleteError = () => {
    setIsModalOpen(false)
    alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
  }

  const { trigger: deleteReward, isMutating } = useMutateDeleteReward(
    deleteTarget.id,
    handleDeleteSuccess,
    handleDeleteError,
  )

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  return (
    <div className="mx-auto max-w-6xl px-10 py-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">จัดการรางวัล</h1>
        <Link
          href="/reward-management/add-reward"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          data-testid="addnew-btn"
        >
          + เพิ่มรางวัล
        </Link>
      </div>

      <div className="relative">
        {isLoading || isMutating ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : rewardList && totalCount > 0 ? (
          <RewardList
            data={rewardList}
            currentPage={currentPage}
            totalPage={totalPage}
            pageSize={pageSize}
            onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
            onNext={() => setCurrentPage((p) => Math.min(totalPage, p + 1))}
            onPageSizeChange={handlePageSizeChange}
            onDeleteClick={(id, name) => {
              setDeleteTarget({ id, name })
              setIsModalOpen(true)
            }}
          />
        ) : (
          <RewardEmptyState />
        )}
      </div>

      <DeleteRewardModal
        isOpen={isModalOpen}
        rewardName={deleteTarget.name}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => deleteReward()}
      />
    </div>
  )
}
