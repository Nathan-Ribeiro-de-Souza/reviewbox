export class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 400
  }
}

export class ConflictError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 409
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 401
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 404
  }
}