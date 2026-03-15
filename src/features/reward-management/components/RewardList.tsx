import Link from 'next/link'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import type { RewardListResponse } from '@/app/api/reward/reward-list/route'

type RewardListProps = {
  data: RewardListResponse[]
  currentPage: number
  totalPage: number
  pageSize: number
  onPrev: () => void
  onNext: () => void
  onPageSizeChange: (size: number) => void
  onDeleteClick: (rewardId: number, rewardTitle: string) => void
}

const PAGE_SIZE_OPTIONS = [10, 20, 50]

export default function RewardList({
  data,
  currentPage,
  totalPage,
  pageSize,
  onPrev,
  onNext,
  onPageSizeChange,
  onDeleteClick,
}: RewardListProps) {
  const isExpired = (endDate: string) => dayjs(endDate).isBefore(dayjs())

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3 pr-4 font-medium">รางวัล</th>
              <th className="pb-3 pr-4 font-medium">วันที่เริ่ม</th>
              <th className="pb-3 pr-4 font-medium">วันที่สิ้นสุด</th>
              <th className="pb-3 pr-4 font-medium">เงื่อนไข</th>
              <th className="pb-3 font-medium">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((reward) => (
              <tr key={reward.id} className="border-b border-gray-100 h-[100px] align-top">
                <td className="py-3 pr-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-900">{reward.info.title}</span>
                    <span className="text-xs text-gray-500">{reward.redeemPoint} คะแนน</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-gray-700">
                  {dayjs(reward.startDate).format('DD/MM/YYYY')}
                </td>
                <td className="py-3 pr-4 text-gray-700">
                  {dayjs(reward.endDate).format('DD/MM/YYYY')}
                </td>
                <td className="py-3 pr-4 text-gray-700 capitalize">{reward.conditionBy}</td>
                <td className="py-3">
                  {!isExpired(reward.endDate) && (
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/reward-management/${reward.id}`}
                        className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        data-testid="edit-btn"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} /> แก้ไข
                      </Link>
                      <button
                        onClick={() => onDeleteClick(reward.id, reward.info.title)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                        data-testid="delete-btn"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>แสดง</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span>รายการ</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="text-sm text-gray-600">
            {currentPage} / {totalPage || 1}
          </span>
          <button
            onClick={onNext}
            disabled={currentPage === totalPage || totalPage === 0}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  )
}
