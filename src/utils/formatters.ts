export function formatRating(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1
  }).format(value)
}

export function formatYear(dateString: string) {
  if (!dateString) {
    return 'Unknown'
  }

  return dateString.slice(0, 4)
}

export function formatVoteCount(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value)
}

export function formatReviewDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date(dateString))
}