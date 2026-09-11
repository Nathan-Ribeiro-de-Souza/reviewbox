import { createContext } from 'react'

import type { ReviewType, CreateReview } from '../../types/ReviewType'

type ReviewsContextType = {
  reviews: ReviewType[]
  addReview: (review: CreateReview) => void
  removeReview: (reviewId: number) => void
  editReview: (reviewId: number, newText: string, newRating: number) => void
}

export const ReviewsContext = createContext<ReviewsContextType | null>(null)