'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardMedia, Typography, Box, Rating } from '@mui/material'
import { Movie } from '../lib/tmdb'
import FallbackImage from './FallbackImage'

interface Props {
  movie: Movie
}

export default function MovieCard({ movie }: Props) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const getImageUrl = () => {
    if (imageError || !movie.poster_path) {
      return 'https://via.placeholder.com/500x750?text=No+Image'
    }
    return `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  }

  const imageUrl = !imageError && movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <Link href={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: 6
          }
        }}
      >
        <CardMedia
          component="div"
          sx={{
            position: 'relative',
            paddingTop: '150%',
          }}
        >
          {imageUrl ? (
            <Box
              component="img"
              src={imageUrl}
              alt={movie.title}
              onError={handleImageError}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <FallbackImage
              width="100%"
              height="100%"
              text={movie.title}
            />
          )}
        </CardMedia>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating
              value={movie.vote_average / 2}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              {movie.vote_average.toFixed(1)}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date?.split('-')[0] || 'N/A'}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}