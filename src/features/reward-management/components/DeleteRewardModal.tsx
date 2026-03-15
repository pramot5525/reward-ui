type DeleteRewardModalProps = {
  isOpen: boolean
  rewardName: string
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteRewardModal({
  isOpen,
  rewardName,
  onClose,
  onConfirm,
}: DeleteRewardModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-xl font-bold text-gray-900">ยืนยันการลบรางวัล</h3>
        <p className="mb-6 text-sm text-gray-600">
          คุณต้องการลบรางวัล <strong>{rewardName}</strong> ใช่หรือไม่?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  )
}
