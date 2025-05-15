'use client'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../lib/tmdb'
import MovieCard from './MovieCard'
import { Grid, Typography, CircularProgress, Alert, Pagination, Box } from '@mui/material'
import { Movie } from '../lib/tmdb'

interface Props {
  query: string
  page: number
  genreId?: number | null
  onPageChange: (page: number) => void
}

export default function MovieGrid({ query, page, genreId, onPageChange }: Props) {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : genreId
    ? `/discover/movie?with_genres=${genreId}&page=${page}`
    : `/movie/popular?page=${page}`

  const { data, error, isLoading } = useSWR(endpoint, fetcher)

  if (error) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      Failed to load movies. Please try again later.
    </Alert>
  )
  
  if (isLoading) return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <CircularProgress />
    </Grid>
  )

  if (!data?.results?.length) return (
    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
      No movies found
    </Typography>
  )

  // Limit the total pages to 500
  const totalPages = Math.min(data.total_pages, 500)

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {data.results.map((movie: Movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(108, 99, 255, 0.1)',
                },
              },
            }}
          />
        </Box>
      )}
    </>
  )
}