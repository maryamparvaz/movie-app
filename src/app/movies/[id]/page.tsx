"use client";
import { useParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Paper,
} from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../../lib/tmdb";
import Link from "next/link";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import FallbackImage from '../../components/FallbackImage';

export default function MovieDetails() {
  const params = useParams();
  const {
    data: movie,
    error,
    isLoading,
  } = useSWR(`/movie/${params.id}`, fetcher);
  const [backdropError, setBackdropError] = useState(false);
  const [posterError, setPosterError] = useState(false);

  if (error)
    return (
      <Container>
        <Typography color="error">Failed to load movie details</Typography>
      </Container>
    );

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (!movie) return null;

  const backdropUrl =
    !backdropError && movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null;

  const posterUrl =
    !posterError && movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

  return (
    <Box>
      {/* Backdrop Image */}
      {backdropUrl && (
        <Box
          sx={{
            position: "relative",
            height: "50vh",
            width: "100%",
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)",
            },
          }}
          onError={() => setBackdropError(true)}
        />
      )}

      <Container
        maxWidth="lg"
        sx={{ mt: backdropUrl ? -10 : 4, position: "relative", zIndex: 1 }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Link href="/" passHref>
            <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
              Back to Movies
            </Button>
          </Link>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              {posterUrl ? (
                <Box
                  component="img"
                  src={posterUrl}
                  alt={movie.title}
                  onError={() => setPosterError(true)}
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "grey.200",
                  }}
                />
              ) : (
                <FallbackImage
                  width="100%"
                  height={500}
                  text={`${movie.title} Poster`}
                />
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" component="h1" gutterBottom>
                {movie.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                {movie.release_date?.split("-")[0]} • {movie.runtime} minutes
              </Typography>
              <Box sx={{ my: 2 }}>
                {movie.genres?.map((genre: any) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Typography paragraph>{movie.overview}</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Additional Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Rating
                    </Typography>
                    <Typography>{movie.vote_average?.toFixed(1)}/10</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Language
                    </Typography>
                    <Typography>
                      {movie.original_language?.toUpperCase()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
