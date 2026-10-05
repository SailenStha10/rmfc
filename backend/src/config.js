export const config = {
  port: Number(process.env.PORT) || 5000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  fotmob: {
    teamId: Number(process.env.FOTMOB_TEAM_ID) || 8633,
    baseUrl: process.env.FOTMOB_BASE_URL || 'https://www.fotmob.com',
    cacheTtlMs: (Number(process.env.FOTMOB_CACHE_TTL_SECONDS) || 300) * 1000,
    timeoutMs: 8000,
  },
}
