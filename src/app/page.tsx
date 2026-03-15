'use client'
import { useAuthStateStore } from '@/core/store/authStateStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const { authState, onGotUser } = useAuthStateStore()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authState === 'logged-in') {
      router.push('/reward-management')
    }
  }, [authState, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        const data = (await res.json()) as { username: string }
        onGotUser({ name: data.username })
      } else {
        const data = (await res.json()) as { message: string }
        setError(data.message)
      }
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-blue-600 lg:flex">
        <div className="flex flex-col items-center gap-6 text-white">
          <span className="text-8xl">🎁</span>
          <h1 className="text-4xl font-bold tracking-tight">Reward Portal</h1>
          <p className="text-lg text-blue-100">ระบบจัดการรางวัลสำหรับผู้ดูแลระบบ</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full flex-col items-center justify-center bg-gray-50 px-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 flex flex-col items-center gap-2 lg:hidden">
            <span className="text-5xl">🎁</span>
            <h1 className="text-2xl font-bold text-gray-900">Reward Portal</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">เข้าสู่ระบบ</h2>
            <p className="mt-1 text-sm text-gray-500">กรุณากรอกข้อมูลเพื่อเข้าใช้งาน</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="กรอกชื่อผู้ใช้"
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="กรอกรหัสผ่าน"
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
