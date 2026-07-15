import { createContext } from 'react'

import type { ReviewType } from '../../types/ReviewType'

type ReviewsContextType = {
  reviews: ReviewType[]
  addReview: (review: ReviewType) => void
  removeReview: (reviewId: number) => void
  editReview: (reviewId: number, newText: string, newRating: number) => void
}

export const ReviewsContext = createContext<ReviewsContextType | null>(null)