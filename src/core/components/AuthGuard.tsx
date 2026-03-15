'use client'
import { useAuthStateStore } from '@/core/store/authStateStore'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

type AuthGuardProps = {
  children: React.ReactNode
  redirectTo?: string
}

export const AuthGuard = ({ children, redirectTo = '/' }: AuthGuardProps) => {
  const { authState } = useAuthStateStore()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (authState === 'no-auth' && pathname !== redirectTo) {
      router.push(redirectTo)
    }
  }, [authState, router, pathname, redirectTo])

  if (authState !== 'logged-in') return null

  return <>{children}</>
}
