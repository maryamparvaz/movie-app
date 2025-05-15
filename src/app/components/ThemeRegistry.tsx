'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C63FF', // Modern purple
      light: '#8F88FF',
      dark: '#4A44B2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00D9F5', // Bright cyan
      light: '#33E1F7',
      dark: '#0098B0',
      contrastText: '#000000',
    },
    background: {
      default: '#0A0A0A', // Deep black
      paper: '#151515', // Slightly lighter black
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0A0A0',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      color: '#FFFFFF',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      color: '#FFFFFF',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      color: '#FFFFFF',
      fontWeight: 600,
    },
    h4: {
      color: '#FFFFFF',
      fontWeight: 600,
    },
    h5: {
      color: '#FFFFFF',
      fontWeight: 600,
    },
    h6: {
      color: '#FFFFFF',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          backgroundColor: '#6C63FF',
          color: '#FFFFFF',
          boxShadow: '0 4px 14px rgba(108, 99, 255, 0.3)',
          '&:hover': {
            backgroundColor: '#8F88FF',
            boxShadow: '0 6px 20px rgba(108, 99, 255, 0.4)',
          },
        },
        outlined: {
          borderColor: '#6C63FF',
          color: '#6C63FF',
          '&:hover': {
            borderColor: '#8F88FF',
            backgroundColor: 'rgba(108, 99, 255, 0.08)',
          },
        },
        text: {
          color: '#6C63FF',
          '&:hover': {
            backgroundColor: 'rgba(108, 99, 255, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#151515',
          borderRadius: 16,
          transition: 'all 0.3s ease-in-out',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(108, 99, 255, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(108, 99, 255, 0.1)',
          color: '#6C63FF',
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(108, 99, 255, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
})

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
} 