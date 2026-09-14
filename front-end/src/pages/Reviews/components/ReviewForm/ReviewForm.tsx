import { useState, type SubmitEvent } from 'react'

import { StarRating } from '../../../../components/RatingStars/StarRating'
import { useReviews } from '../../../../hooks/useReviews'
import type { AddDetailsReviewsForm, ReviewType } from '../../../../types/ReviewType'

import './ReviewForm.css'
import { useAuth } from '../../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { type CreateReview } from '../../../../types/ReviewType'

type ReviewFormProps = {
  media: AddDetailsReviewsForm
  onReviewAdded: (review: ReviewType) => void
}

export function ReviewForm({ media, onReviewAdded }: ReviewFormProps) {
  const { addReview } = useReviews()

  const [reviewText, setReviewText] = useState('')
  const [userRating, setUserRating] = useState<ReviewType['userRating']>(0)

  const {isAuthenticated} = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if(!isAuthenticated){
     navigate('/login', {
      state: {message: 'You need to be logged in to access a review'}
     })
     return
    }

    const trimmedText = reviewText.trim()

    if (trimmedText.length < 3) {
      alert('Review must have at least 3 characters.')
      return
    }

    if (userRating === 0) {
      alert('Please select at least one star.')
      return
    }

    const newReview: CreateReview = {
      userReview: trimmedText,
      userRating,
      ...media
    }

    const createdReview = await addReview(newReview)

    onReviewAdded(createdReview)

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