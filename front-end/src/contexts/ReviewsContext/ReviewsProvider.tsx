import { type ReactNode, useEffect, useState } from 'react'

import {
  deleteReview,
  editingReview,
  getReviews,
  postReviews
} from '../../services/api'

import { ReviewsContext } from './ReviewsContext'

import type {
  CreateReview,
  ReviewType
} from '../../types/ReviewType'

import { useAuth } from '../../hooks/useAuth'

type ReviewsProviderProps = {
  children: ReactNode
}

export function ReviewsProvider({ children }: ReviewsProviderProps) {
  const [reviews, setReviews] = useState<ReviewType[]>([])

  const { handleExpiredToken } = useAuth()

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getReviews()

        setReviews(data)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === 'Invalid or expired token'
        ) {
          handleExpiredToken()
        }
      }
    }

    loadReviews()
  }, [handleExpiredToken])

  async function addReview(review: CreateReview) {
    try {
      const newReview = await postReviews(
        review.mediaId,
        review.userRating,
        review.userReview,
        review.reviewType
      )

      const completeReview: ReviewType = {
        ...newReview,
        title: review.title,
        posterPath: review.posterPath,
        releaseDate: review.releaseDate
      }

      setReviews((prev) => [...prev, completeReview])
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Invalid or expired token'
      ) {
        handleExpiredToken()
      }

      throw error
    }
  }

  async function removeReview(reviewId: number) {
    try {
      await deleteReview(reviewId)

      setReviews((prev) =>
        prev.filter((review) => review.id !== reviewId)
      )
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Invalid or expired token'
      ) {
        handleExpiredToken()
      }

      throw error
    }
  }

  async function editReview(
    reviewId: number,
    newText: string,
    newRating: number
  ) {
    try {
      await editingReview(reviewId, newText, newRating)

      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                userReview: newText,
                userRating: newRating
              }
            : review
        )
      )
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Invalid or expired token'
      ) {
        handleExpiredToken()
      }

      throw error
    }
  }

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        removeReview,
        editReview
      }}
    >
      {children}
    </ReviewsContext.Provider>
  )
}