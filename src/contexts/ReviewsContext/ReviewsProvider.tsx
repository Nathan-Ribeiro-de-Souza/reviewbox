import { type ReactNode } from 'react'

import { ReviewsContext } from './ReviewsContext'

import { useLocalStorage } from '../../hooks/useLocalStorage'

import type { ReviewType } from '../../types/ReviewType'

type ReviewsProviderProps = {
  children: ReactNode
}

const REVIEWS_STORAGE_KEY = 'reviewbox:reviews'

export function ReviewsProvider({ children }: ReviewsProviderProps) {
  const [reviews, setReviews] = useLocalStorage<ReviewType[]>(REVIEWS_STORAGE_KEY, [])

  function addReview(review: ReviewType) {
    setReviews((prev) => [...prev, review])
  }

  function removeReview(reviewId: number) {
    setReviews((prev) =>
      prev.filter((review) => review.id !== reviewId)
    )
  }

  function editReview(reviewId: number, newText: string, newRating: number ) {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, userReview: newText, userRating: newRating  }
          : review
      )
    )
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