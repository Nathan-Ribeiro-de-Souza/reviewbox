import { Router } from 'express'

import { authMiddleware } from '../middlewares/auth.middleware.js'

import {
  controllerDeleteFavorites,
  controllerGetFavorites,
  controllerPostFavorites
} from '../controllers/favorites.controller.js'

const router = Router()

router.use('/favorites', authMiddleware)

router.get('/favorites', controllerGetFavorites)
router.post('/favorites', controllerPostFavorites)
router.delete('/favorites/:id', controllerDeleteFavorites)

export default router