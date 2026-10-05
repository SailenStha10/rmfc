import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { getMatches } from '../services/fotmob.service.js'

const router = Router()

router.use(rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: true, legacyHeaders: false }))

router.get('/', async (req, res) => {
  try {
    res.json(await getMatches())
  } catch {
    res.status(502).json({ error: 'Match data is currently unavailable' })
  }
})

export default router
