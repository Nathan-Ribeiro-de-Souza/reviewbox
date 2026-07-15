import { useState, type SubmitEvent } from 'react'

import { StarRating } from '../../../../components/RatingStars/StarRating'
import { useReviews } from '../../../../hooks/useReviews'
import { mapToReview } from '../../../../utils/mapToReview'

import type { MovieDetails } from '../../../../types/ApiTypes'
import type { ReviewType } from '../../../../types/ReviewType'

import './ReviewForm.css'

type ReviewFormProps = {
  movie: MovieDetails
}

export function ReviewForm({ movie }: ReviewFormProps) {
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

    const newReview = mapToReview(movie, trimmedText, userRating)

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