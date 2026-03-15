import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import './globals.css'
import ContextProviders from './context-providers'

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Reward Management',
  description: 'Reward management portal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${kanit.className} min-h-screen bg-gray-50 antialiased`}>
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  )
}
