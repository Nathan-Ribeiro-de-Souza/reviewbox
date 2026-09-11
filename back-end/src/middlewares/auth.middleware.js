import jwt from 'jsonwebtoken'

import { UnauthorizedError } from '../errors/errors.js'

export function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization

  if (!authorization) {
    throw new UnauthorizedError('Token not provided')
  }

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer' || !token) {
    throw new UnauthorizedError('Invalid token')
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = payload

    next()
  } catch {
    throw new UnauthorizedError(
      'Invalid or expired token'
    )
  }
}