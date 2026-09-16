import {
  serviceProfile,
  serviceUpdateUserName,
  serviceUserLogin,
  serviceUserRegister,
  serviceGetProfileById
} from '../services/user.service.js'

export async function controllerUserRegister(
  req,
  res,
  next
) {
  try {
    const {
      name,
      email,
      password
    } = req.body

    const newUser = await serviceUserRegister(
      name,
      email,
      password
    )

    return res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

export async function controllerUserLogin(
  req,
  res,
  next
) {
  try {
    const {
      email,
      password
    } = req.body

    const user = await serviceUserLogin(
      email,
      password
    )

    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export async function controllerProfile(
  req,
  res,
  next
) {
  try {
    const userId = req.user.user_id

    const profile = await serviceProfile(userId)

    return res.status(200).json(profile)
  } catch (error) {
    next(error)
  }
}

export async function controllerUpdateUserName(req, res) {
  const userId = req.user.user_id
  const { name } = req.body

  const updatedName = await serviceUpdateUserName(
    userId,
    name
  )

  return res.status(201).json(updatedName)
}

export async function controllerGetProfileById(req, res) {
  const { userId } = req.params

  const profile = await serviceGetProfileById(userId)

  return res.status(200).json(profile)
}