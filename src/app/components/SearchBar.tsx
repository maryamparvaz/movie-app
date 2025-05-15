'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { TextField, Button } from '@mui/material'

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/?query=${query}`)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
      <TextField
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="bg-white rounded-lg"
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  )
}