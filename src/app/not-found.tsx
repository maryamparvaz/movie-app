'use client'
import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Page Not Found
      </Typography>
      <Button component={Link} href="/" variant="contained">
        Go back home
      </Button>
    </Box>
  )
} 