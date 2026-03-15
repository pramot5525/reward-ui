import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? 'change-me-in-production-min-32-chars!!',
)
const COOKIE_NAME = 'session'
const SESSION_DURATION = 60 * 60 * 8 // 8 hours in seconds

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { username?: string; password?: string }

  const validUsername = process.env.AUTH_USERNAME ?? 'admin'
  const validPassword = process.env.AUTH_PASSWORD ?? 'admin'

  if (body.username !== validUsername || body.password !== validPassword) {
    return Response.json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 })
  }

  const token = await new SignJWT({ username: body.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(SECRET)

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  })

  return Response.json({ username: body.username }, { status: 200 })
}
