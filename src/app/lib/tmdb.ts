export interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  genre_ids?: number[]
}

export interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL || 'https://api.themoviedb.org/3'

export async function getMovies(query: string = '', page: number = 1, genreId?: number): Promise<MovieResponse> {
  let url = query 
    ? `${TMDB_BASE_URL}/search/movie?query=${query}&page=${page}`
    : `${TMDB_BASE_URL}/movie/popular?page=${page}`

  if (genreId) {
    url += `&with_genres=${genreId}`
  }

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      'accept': 'application/json'
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch movies')
  }

  return res.json()
}

export async function getMovieDetails(id: string): Promise<any> {
  const res = await fetch(`${TMDB_BASE_URL}/movie/${id}`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      'accept': 'application/json'
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch movie details')
  }

  return res.json()
}

export async function getGenres(): Promise<{ genres: Genre[] }> {
  const res = await fetch(`${TMDB_BASE_URL}/genre/movie/list`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      'accept': 'application/json'
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch genres')
  }

  return res.json()
}

export const fetcher = async (url: string) => {
  const res = await fetch(`${TMDB_BASE_URL}${url}`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      'accept': 'application/json'
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}