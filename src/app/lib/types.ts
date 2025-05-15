export interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string
    backdrop_path: string
    release_date: string
    vote_average: number
    vote_count: number
    genre_ids: number[]
  }
  
  export interface MovieDetails extends Movie {
    runtime: number
    genres: {
      id: number
      name: string
    }[]
    tagline: string
    status: string
    revenue: number
    budget: number
  }