import { Router } from 'express'

import userRoutes from './user.routes.js'
import reviewsRoutes from './reviews.routes.js'
import favoritesRoutes from './favorites.routes.js'

const router = Router()

router.use(userRoutes)
router.use(reviewsRoutes)
router.use(favoritesRoutes)

export default router