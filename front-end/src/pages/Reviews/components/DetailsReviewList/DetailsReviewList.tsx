import { useState } from 'react'
import { Link } from 'react-router-dom'

import { StarRating } from '../../../../components/RatingStars/StarRating'
import { useReviews } from '../../../../hooks/useReviews'
import { useAuth } from '../../../../hooks/useAuth'

import { formatReviewDate } from '../../../../utils/formatters'
import { getAvatarColor, getInitial } from '../../../../utils/avatar'

import type { ReviewType } from '../../../../types/ReviewType'

import './DetailsReviewList.css'

type DetailsReviewListProps = {
  reviews: ReviewType[]
  onReviewUpdated: (
    reviewId: number,
    newText: string,
    newRating: number
  ) => void
  onReviewDeleted: (reviewId: number) => void
}

export function DetailsReviewList({ reviews, onReviewUpdated, onReviewDeleted }: DetailsReviewListProps) {
  const { removeReview, editReview } = useReviews()
  const { user } = useAuth()

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

 async function handleSaveEdit(reviewId: number) {
    const trimmedText = editedText.trim()

    if (trimmedText.length < 3) {
      alert('Review must have at least 3 characters.')
      return
    }

    await editReview(reviewId, trimmedText, editRating)

    onReviewUpdated(reviewId, trimmedText, editRating)


    setEditingReviewId(null)
    setEditedText('')
    setEditRating(0)
  }

  return (
    <div className="details-review-list">
      {reviews.map((review) => {
        const isOwner = user?.id === review.userId
        const isEditing = editingReviewId === review.id
        const avatarColor = review.userId
          ? getAvatarColor(review.userId)
          : undefined
        const initial = review.userName
          ? getInitial(review.userName)
          : '?'

        return (
          <article key={review.id} className="details-review-card">
            <div className="details-review-card-header">
              {review.userName && review.userId ? (
                <Link
                  to={`/profile/${review.userId}`}
                  className="details-review-author"
                >
                  <div
                    className="details-review-avatar"
                    style={{ backgroundColor: avatarColor }}
                  >
                    {initial}
                  </div>

                  <strong>{review.userName}</strong>
                </Link>
              ) : (
                <div className="details-review-author">
                  <div className="details-review-avatar">
                    {initial}
                  </div>

                  <strong>{review.userName ?? 'Unknown user'}</strong>
                </div>
              )}

              <span>{formatReviewDate(review.createdAt)}</span>
            </div>

            {isEditing ? (
              <div className="details-review-edit">
                <StarRating
                  value={editRating}
                  onChange={setEditRating}
                />

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
                <StarRating
                  value={review.userRating}
                  readOnly
                />

                <p className="details-review-text">
                  {review.userReview}
                </p>

                {isOwner && (

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
                    onClick={async () => {
                      await removeReview(review.id)
                      onReviewDeleted(review.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
               )}
              </>
            )}
          </article>
        )
      })}
    </div>
  )
}