import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'

export default function RewardEmptyState() {
  return (
    <div className="flex h-[480px] flex-col items-center justify-center gap-2 rounded-lg bg-white p-6">
      <FontAwesomeIcon icon={faGift} className="text-6xl text-gray-300" />
      <div className="flex flex-col items-center gap-3">
        <p className="text-lg font-semibold text-gray-800">ไม่พบรายการรางวัล</p>
        <span className="text-sm text-gray-500">ยังไม่มีรางวัล กรุณาเพิ่มรางวัลใหม่</span>
      </div>
    </div>
  )
}
