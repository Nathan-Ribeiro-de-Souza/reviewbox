import { useState } from 'react'

import { StarRating } from '../../../../components/RatingStars/StarRating'
import { useReviews } from '../../../../hooks/useReviews'
import { formatReviewDate } from '../../../../utils/formatters'

import type { ReviewType } from '../../../../types/ReviewType'

import './DetailsReviewList.css'

type DetailsReviewListProps = {
  reviews: ReviewType[]
}

export function DetailsReviewList({ reviews }: DetailsReviewListProps) {
  const { removeReview, editReview } = useReviews()

  const [editingReviewId, setEditingReviewId] = useState<number | null>(null)
  const [editedText, setEditedText] = useState('')
  const [editRating, setEditRating] = useState(0)

  function handleStartEdit(review: ReviewType) {
    setEditingReviewId(review.id)
    setEditedText(review.userReview)
    setEditRating(review.userRating)
  }

  function handleCancelEdit() {
    setEditingReviewId(null)
    setEditedText('')
    setEditRating(0)
  }

  function handleSaveEdit(reviewId: number) {
    const trimmedText = editedText.trim()

    if (trimmedText.length < 3) {
      alert('Review must have at least 3 characters.')
      return
    }

    editReview(reviewId, trimmedText, editRating)
    setEditingReviewId(null)
    setEditedText('')
    setEditRating(0)
  }

  return (
    <div className="details-review-list">
      {reviews.map((review) => {
        const isEditing = editingReviewId === review.id

        return (
          <article key={review.id} className="details-review-card">
            <div className="details-review-card-header">
              <span>{formatReviewDate(review.createdAt)}</span>
            </div>

            {isEditing ? (
              <div className="details-review-edit">
                <StarRating value={editRating} onChange={setEditRating} />

                <textarea
                  value={editedText}
                  onChange={(event) => setEditedText(event.target.value)}
                  rows={4}
                />

                <div className="details-review-actions">
                  <button
                    type="button"
                    className="review-save-button"
                    onClick={() => handleSaveEdit(review.id)}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="review-secondary-button"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <StarRating value={review.userRating} readOnly />

                <p className="details-review-text">{review.userReview}</p>

                <div className="details-review-actions">
                  <button
                    type="button"
                    className="review-secondary-button"
                    onClick={() => handleStartEdit(review)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="review-delete-button"
                    onClick={() => removeReview(review.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </article>
        )
      })}
    </div>
  )
}