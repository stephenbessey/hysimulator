export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://hysimulator-backend.onrender.com',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const