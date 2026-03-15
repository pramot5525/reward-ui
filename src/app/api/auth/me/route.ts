import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? 'change-me-in-production-min-32-chars!!',
)

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, SECRET)
    return Response.json({ username: payload.username }, { status: 200 })
  } catch {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }
}
