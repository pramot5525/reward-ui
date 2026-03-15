export default function RewardEmptyState() {
  return (
    <div className="flex h-[480px] flex-col items-center justify-center gap-2 rounded-lg bg-white p-6">
      <div className="text-6xl">🎁</div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-lg font-semibold text-gray-800">ไม่พบรายการรางวัล</p>
        <span className="text-sm text-gray-500">ยังไม่มีรางวัล กรุณาเพิ่มรางวัลใหม่</span>
      </div>
    </div>
  )
}
