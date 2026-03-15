import 'server-only'
import { SignJWT } from 'jose'
import { SERVER_CONFIGS } from '@/configs/server-configs'

export const generateServiceToken = async (): Promise<string> => {
  const secret = new TextEncoder().encode(SERVER_CONFIGS.APP_JWT_SECRET)
  return new SignJWT({ user_id: 'user-001' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
}
