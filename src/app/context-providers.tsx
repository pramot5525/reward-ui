'use client'
import { useInitAuth } from '@/core/auth/useInitAuth'

const AuthInit = () => {
  useInitAuth()
  return null
}

export default function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthInit />
      {children}
    </>
  )
}
