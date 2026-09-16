import {
  serviceDeleteReviews,
  serviceEditReview,
  serviceGetReviews,
  servicePostReviews,
  serviceGetReviewsByMedia
} from '../services/reviews.service.js'

export async function controllerGetReviews(req, res) {
  const userId = req.user.user_id

  const reviews = await serviceGetReviews(userId)

  return res.status(200).json(reviews)
}

export async function controllerPostReviews(req, res) {
  const userId = req.user.user_id

  const {
    media_id,
    rating,
    comment,
    media_type
  } = req.body

  const review = await servicePostReviews(
    userId,
    media_id,
    rating,
    comment,
    media_type
  )

  return res.status(201).json(review)
}

export async function controllerDeleteReviews(req, res) {
  const userId = req.user.user_id
  const reviewId = Number(req.params.id)

  const review = await serviceDeleteReviews(
    reviewId,
    userId
  )

  return res.status(200).json(review)
}

export async function controllerPatchReviews(req, res) {
  const {
    comment,
    rating
  } = req.body

  const userId = req.user.user_id
  const reviewId = Number(req.params.id)

  const review = await serviceEditReview(
    reviewId,
    userId,
    comment,
    rating
  )

  return res.status(200).json(review)
}

export async function controllerGetReviewsByMedia(req, res) {
  const mediaId = Number(req.params.mediaId)
  const mediaType = req.params.mediaType

  const reviews = await serviceGetReviewsByMedia( mediaId, mediaType )

  return res.status(200).json(reviews)
}