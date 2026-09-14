import { createContext } from 'react'

import type { ReviewType, CreateReview } from '../../types/ReviewType'

type ReviewsContextType = {
  reviews: ReviewType[]
  addReview: (review: CreateReview) => Promise<ReviewType>
  removeReview: (reviewId: number) => Promise<void>
  editReview: (reviewId: number, newText: string, newRating: number) => Promise<void>
}

export const ReviewsContext = createContext<ReviewsContextType | null>(null)