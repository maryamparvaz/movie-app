import React from 'react';
import { Box, Typography } from '@mui/material';

interface FallbackImageProps {
  width?: string | number;
  height?: string | number;
  text?: string;
}

export default function FallbackImage({ width = '100%', height = '100%', text = 'No Image' }: FallbackImageProps) {
  return (
    <Box
      sx={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.200',
        color: 'grey.500',
        borderRadius: 1,
      }}
    >
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
} 