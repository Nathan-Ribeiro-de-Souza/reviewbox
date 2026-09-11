import './StarRating.css'

type StarRatingProps = {
  value: number
  onChange?: (rating: number) => void
  readOnly?: boolean
}

const stars = [1, 2, 3, 4, 5]

export function StarRating({ value, onChange, readOnly = false }: StarRatingProps) {

  return (
    <div className="star-rating" aria-label={`Rating: ${value} out of 5`}>
      {stars.map((star) => {
        const isActive = star <= value

        return (
          <button
            key={star}
            type="button"
            className={ isActive ? 'star-button star-button-active' : 'star-button' }
            onClick={() => {
              if (!readOnly) {
                onChange?.(star)
              }
            }}
            disabled={readOnly}
            aria-label={`${star} star`}
          >
            {isActive ? '★' : '☆'}
          </button>
        )
      })}
    </div>
  )
}