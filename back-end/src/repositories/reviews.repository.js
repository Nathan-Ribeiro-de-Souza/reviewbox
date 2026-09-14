import { database } from '../database.js'

export async function getReviews(userId) {
  const result = await database.query(`
    SELECT
      id,
      media_id AS "mediaId",
      rating AS "userRating",
      comment AS "userReview",
      created_at AS "createdAt",
      media_type AS "reviewType"
    FROM reviews
    WHERE user_id = $1
    ORDER BY created_at DESC
  `, [userId])

  return result.rows
}

export async function postReviews(
  userId,
  mediaId,
  rating,
  comment,
  mediaType
) {
  const result = await database.query(`
    INSERT INTO reviews (
      user_id,
      media_id,
      rating,
      comment,
      media_type
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      user_id AS "userId",
      media_id AS "mediaId",
      rating AS "userRating",
      comment AS "userReview",
      created_at AS "createdAt",
      media_type AS "reviewType"
  `, [
    userId,
    mediaId,
    rating,
    comment,
    mediaType
  ])

  const review =result.rows[0]

  const userResult = await database.query(`
    SELECT
      name AS "userName"
    FROM users
    WHERE id = $1
  `, [userId])

  return {
    ...review,
    userName: userResult.rows[0]?.userName
  }
}

export async function deleteReview(reviewId, userId) {
  const result = await database.query(`
    DELETE FROM reviews
    WHERE id = $1 AND user_id = $2
    RETURNING
      id,
      media_id AS "mediaId"
  `, [reviewId, userId])

  return result.rows[0]
}

export async function editReview(
  reviewId,
  userId,
  comment,
  rating
) {
  const result = await database.query(`
    UPDATE reviews
    SET
      comment = $3,
      rating = $4
    WHERE id = $1 AND user_id = $2
    RETURNING
      id,
      media_id AS "mediaId",
      rating AS "userRating",
      comment AS "userReview",
      created_at AS "createdAt",
      media_type AS "reviewType"
  `, [
    reviewId,
    userId,
    comment,
    rating
  ])

  return result.rows[0]
}

export async function getReviewsByMedia(mediaId, mediaType) {
  const result = await database.query(`
    SELECT
      reviews.id,
      reviews.media_id AS "mediaId",
      reviews.rating AS "userRating",
      reviews.comment AS "userReview",
      reviews.created_at AS "createdAt",
      reviews.media_type AS "reviewType",
      users.id AS "userId",
      users.name AS "userName"
    FROM reviews
    JOIN users
    ON users.id = reviews.user_id
    WHERE reviews.media_id = $1
      AND reviews.media_type = $2
    ORDER BY reviews.created_at DESC
  `, [
    mediaId,
    mediaType
  ])

  return result.rows
}