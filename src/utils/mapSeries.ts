import type { TVSeriesDetails } from '../types/ApiTypes'
import type { FavoriteType } from '../types/FavoriteTypes'
import type { MediaDetailsType } from '../types/MediaDetailsType'

export function mapSeriesToFavorite(series: TVSeriesDetails): FavoriteType {
  return {
    id: series.id,
    mediaType: 'Serie',
    title: series.name,
    poster_path: series.poster_path,
    release_date: series.first_air_date,
    vote_average: series.vote_average
  }
}

export function mapSeriesToMediaDetails(TVSeries: TVSeriesDetails, creators: string): MediaDetailsType {
return {
    title: TVSeries.name,
    overview: TVSeries.overview,
    voteCount: TVSeries.vote_count,
    posterPath: TVSeries.poster_path,
    voteAverage: TVSeries.vote_average,
    releaseDate: TVSeries.first_air_date,
    genres: TVSeries.genres,
    metaItems: [
      {label: 'Created by', value: creators || 'Unknown'},
      {label: 'Seasons', value: TVSeries.number_of_seasons},
      {label: 'Episodes', value: TVSeries.number_of_episodes},
      {label: 'Status', value: TVSeries.status}
    ] 
    

}}