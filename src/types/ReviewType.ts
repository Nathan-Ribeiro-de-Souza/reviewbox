export type ReviewType = {
  id: number
  mediaId: number
  title: string
  userReview: string
  posterPath: string | null
  releaseDate: string
  createdAt: string
  userRating: number
  reviewType: 'movies' | 'series'
}

export type AddDetailsReviewsForm = Pick<
  ReviewType,
  'title' | 'posterPath' | 'mediaId' | 'releaseDate' | 'reviewType'
>