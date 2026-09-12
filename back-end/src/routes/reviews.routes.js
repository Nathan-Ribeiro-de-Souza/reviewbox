import { Router } from 'express'

import { authMiddleware } from '../middlewares/auth.middleware.js'

import {
  controllerDeleteReviews,
  controllerGetReviews,
  controllerPatchReviews,
  controllerPostReviews,
  controllerGetReviewsByMedia
} from '../controllers/reviews.controller.js'

const router = Router()

router.use(authMiddleware)

router.get('/reviews', controllerGetReviews)
router.post('/reviews', controllerPostReviews)
router.delete('/reviews/:id', controllerDeleteReviews)
router.patch('/reviews/:id', controllerPatchReviews)
router.get('/reviews/media/:mediaId/:mediaType', controllerGetReviewsByMedia)

export default router