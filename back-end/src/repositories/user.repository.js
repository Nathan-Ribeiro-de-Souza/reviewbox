import { database } from '../database.js'

export async function registerUser(name, email, passwordHash) {
  const result = await database.query(`
    INSERT INTO users (
      name,
      email,
      password_hash
    )
    VALUES ($1, $2, $3)
    RETURNING id, name, email
  `, [name, email, passwordHash])

  return result.rows[0]
}

export async function findUserByEmail(email) {
  const result = await database.query(`
    SELECT
      id,
      name,
      email,
      password_hash
    FROM users
    WHERE email = $1
  `, [email])

  return result.rows[0]
}

export async function getUserProfile(userId) {
  const result = await database.query(`
    SELECT
      users.id,
      users.name,
      users.email,
      users.created_at AS "createdAt",
      (
        SELECT COUNT(*)
        FROM reviews
        WHERE reviews.user_id = users.id
      ) AS "reviewCount"
    FROM users
    WHERE users.id = $1
  `, [userId])

  return result.rows[0]
}

export async function updateUserName(userId, name) {
  const result = await database.query(`
    UPDATE users
    SET name = $1
    WHERE id = $2
    RETURNING name
  `, [name, userId])

  return result.rows[0]
}