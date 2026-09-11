import { Router } from 'express'

import {
  controllerProfile,
  controllerUserLogin,
  controllerUserRegister
} from '../controllers/user.controller.js'

import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/users', controllerUserRegister)
router.post('/login', controllerUserLogin)

router.use(authMiddleware)

router.get('/users/me', controllerProfile)

export default router