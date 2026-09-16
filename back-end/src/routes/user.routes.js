import { Router } from 'express'

import {
  controllerProfile,
  controllerUserLogin,
  controllerUserRegister,
  controllerUpdateUserName,
  controllerGetProfileById
} from '../controllers/user.controller.js'

import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/users', controllerUserRegister)
router.post('/login', controllerUserLogin)

router.get('/users/me', authMiddleware, controllerProfile)
router.patch('/users/me', authMiddleware, controllerUpdateUserName)

router.get('/users/:userId', controllerGetProfileById)

export default router