import { database } from '../database.js'

export async function getFavorites(userId) {
  const result = await database.query(`
    SELECT
      id,
      media_id AS "mediaId",
      media_type AS "mediaType"
    FROM favorites
    WHERE user_id = $1
  `, [userId])

  return result.rows
}

export async function postFavorites(
  userId,
  mediaId,
  mediaType
) {
  const result = await database.query(`
    INSERT INTO favorites (
      user_id,
      media_id,
      media_type
    )
    VALUES ($1, $2, $3)
    RETURNING id, media_id, media_type, created_at
  `, [userId, mediaId, mediaType])

  return result.rows[0]
}

export async function deleteFavorite(userId, favoriteId) {
  const result = await database.query(`
    DELETE FROM favorites
    WHERE user_id = $1 AND id = $2
    RETURNING id, media_id
  `, [userId, favoriteId])

  return result.rows[0]
}