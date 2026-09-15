import { Router } from 'express'

import {
  controllerProfile,
  controllerUserLogin,
  controllerUserRegister,
  controllerUpdateUserName
} from '../controllers/user.controller.js'

import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/users', controllerUserRegister)
router.post('/login', controllerUserLogin)

router.use('/users', authMiddleware)

router.get('/users/me', controllerProfile)
router.patch('/users/me', controllerUpdateUserName)

export default router