import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {
  ConflictError,
  UnauthorizedError,
  ValidationError,
  NotFoundError
} from '../errors/errors.js'


import {
  findUserByEmail,
  getUserProfile,
  registerUser,
  updateUserName,
  getUserById
} from '../repositories/user.repository.js'

export async function serviceUserRegister(
  fullName,
  email,
  password
) {
  if (typeof fullName !== 'string' || fullName.trim() === '') {
    throw new ValidationError('Invalid name')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (typeof email !== 'string' || !emailRegex.test(email.trim())) {
    throw new ValidationError('Invalid email')
  }

  if (typeof password !== 'string' || password.trim() === '') {
    throw new ValidationError('Invalid password')
  }

  if (password.length < 8) {
    throw new ValidationError(
      'Password must be at least 8 characters'
    )
  }

  const cleanName = fullName.trim()
  const cleanEmail = email.trim()

  const passwordHash = await bcrypt.hash(password, 10)

  try {
    return await registerUser(
      cleanName,
      cleanEmail,
      passwordHash
    )
  } catch (error) {
    if (error.code === '23505') {
      throw new ConflictError('Email already exists')
    }

    throw error
  }
}

export async function serviceUserLogin(
  email,
  password
) {
  if (typeof email !== 'string' || email.trim() === '') {
    throw new ValidationError('Invalid email')
  }

  if (typeof password !== 'string' || password.trim() === '') {
    throw new ValidationError('Invalid password')
  }

  const user = await findUserByEmail(email.trim())

  if (!user) {
    throw new UnauthorizedError(
      'Email or password is invalid'
    )
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password_hash
  )

  if (!passwordMatches) {
    throw new UnauthorizedError(
      'Email or password is invalid'
    )
  }

  const token = jwt.sign(
    {
      user_id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  )

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}

export async function serviceProfile(userId) {
  return getUserProfile(userId)
}

export async function serviceUpdateUserName(userId, name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new ValidationError('Name is required')
  }

  const updatedUser = await updateUserName(
    userId,
    name.trim()
  )

  if (!updatedUser) {
    throw new NotFoundError('User not found')
  }

  return updatedUser.name
}

export async function serviceGetProfileById(userId) {
  const userIdNumber = Number(userId)

  if (isNaN(userIdNumber)) {
    throw new ValidationError('Invalid user ID')
  }

  const profile = await getUserById(userIdNumber)

  if (!profile) {
    throw new NotFoundError('User not found')
  }

  return profile
}