import 'server-only'

export const SERVER_CONFIGS = {
  REWARD_SERVICE: {
    BASE_URL: process.env.REWARD_SERVICE_BASE_URL || 'http://reward-service:8080',
  },
  LOYALTY_SERVICE: {
    BASE_URL: process.env.REWARD_SERVICE_BASE_URL || 'http://reward-service:8080',
  },
  APP_JWT_SECRET: process.env.APP_JWT_SECRET || 'local-secret-change-in-production',
}
