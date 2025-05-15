'use client'
import { useState } from 'react'
import { Container, TextField, Box, Typography, Chip, CircularProgress } from '@mui/material'
import MovieGrid from './components/MovieGrid'
import useSWR from 'swr'
import { fetcher } from './lib/tmdb'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [page, setPage] = useState(1)

  const { data: genresData, isLoading: isLoadingGenres } = useSWR('/genre/movie/list', fetcher)

  const handleGenreClick = (genreId: number) => {
    setSelectedGenre(selectedGenre === genreId ? null : genreId)
    setPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setPage(1)
    if (e.target.value) {
      setSelectedGenre(null)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Movie Explorer
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search movies"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
        />

        {isLoadingGenres ? (
          <CircularProgress size={20} />
        ) : (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {genresData?.genres.map((genre: any) => (
              <Chip
                key={genre.id}
                label={genre.name}
                onClick={() => handleGenreClick(genre.id)}
                color={selectedGenre === genre.id ? 'primary' : 'default'}
                variant={selectedGenre === genre.id ? 'filled' : 'outlined'}
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        )}
      </Box>

      <MovieGrid
        query={searchQuery}
        page={page}
        genreId={selectedGenre}
        onPageChange={setPage}
      />
    </Container>
  )
}