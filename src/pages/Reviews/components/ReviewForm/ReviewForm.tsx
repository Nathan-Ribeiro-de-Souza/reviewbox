import { useState, type SubmitEvent } from 'react'

import { StarRating } from '../../../../components/RatingStars/StarRating'
import { useReviews } from '../../../../hooks/useReviews'

import type { AddDetailsReviewsForm, ReviewType } from '../../../../types/ReviewType'

import './ReviewForm.css'

type ReviewFormProps = {
  media: AddDetailsReviewsForm
}

export function ReviewForm({ media }: ReviewFormProps) {
  const { addReview } = useReviews()

  const [reviewText, setReviewText] = useState('')
  const [userRating, setUserRating] = useState<ReviewType['userRating']>(0)

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedText = reviewText.trim()

    if (trimmedText.length < 3) {
      alert('Review must have at least 3 characters.')
      return
    }

    if (userRating === 0) {
      alert('Please select at least one star.')
      return
    }

    const newReview: ReviewType = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      userReview: trimmedText,
      userRating,
      ...media
    }

    addReview(newReview)

    setReviewText('')
    setUserRating(0)
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <StarRating value={userRating} onChange={setUserRating} />

      <textarea
        value={reviewText}
        onChange={(event) => setReviewText(event.target.value)}
        placeholder="Write your review..."
        rows={4}
      />

      <button type="submit">Add review</button>
    </form>
  )
}