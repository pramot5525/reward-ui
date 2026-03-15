import { AuthGuard } from '@/core/components/AuthGuard'
import Navbar from '@/core/components/Navbar'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
