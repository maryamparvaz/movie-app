'use client'
import { Box, Button, Typography } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

interface Props {
  page: number
  setPage: (page: number) => void
  totalPages?: number
}

export default function Pagination({ page, setPage, totalPages = 1 }: Props) {
  const prev = () => setPage(Math.max(page - 1, 1))
  const next = () => setPage(Math.min(page + 1, totalPages))

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4 }}>
      <Button
        variant="contained"
        startIcon={<ChevronLeft />}
        onClick={prev}
        disabled={page <= 1}
      >
        Previous
      </Button>
      <Typography variant="body1">
        Page {page} of {totalPages}
      </Typography>
      <Button
        variant="contained"
        endIcon={<ChevronRight />}
        onClick={next}
        disabled={page >= totalPages}
      >
        Next
      </Button>
    </Box>
  )
} 