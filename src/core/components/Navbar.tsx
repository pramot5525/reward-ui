'use client'
import { useAuthStateStore } from '@/core/store/authStateStore'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { user, onUnAuthorized } = useAuthStateStore()
  const router = useRouter()

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    onUnAuthorized()
    router.push('/')
  }

  return (
    <header className="shrink-0 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-14 items-center justify-between px-8">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🎁</span>
          <span className="text-base font-bold tracking-tight text-gray-900">Reward Portal</span>
        </div>

        <div className="flex items-center gap-4">
          {user?.name && (
            <span className="text-sm text-gray-500">
              สวัสดี,{' '}
              <span className="font-semibold text-gray-800">{user.name}</span>
            </span>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </header>
  )
}
