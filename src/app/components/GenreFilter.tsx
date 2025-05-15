import { Button, ButtonGroup, Typography } from '@mui/material';

interface GenreFilterProps {
  onFilterChange: (genre: string) => void;
}

const genres = [
  { id: '28', name: 'Action' },
  { id: '12', name: 'Adventure' },
  { id: '16', name: 'Animation' },
  { id: '35', name: 'Comedy' },
  { id: '18', name: 'Drama' },
];

export default function GenreFilter({ onFilterChange }: GenreFilterProps) {
  return (
    <div className="my-8">
      <Typography variant="h6" gutterBottom>
        Filter by Genre
      </Typography>
      <ButtonGroup variant="outlined" className="flex-wrap">
        <Button onClick={() => onFilterChange('')}>All</Button>
        {genres.map((genre) => (
          <Button key={genre.id} onClick={() => onFilterChange(genre.id)}>
            {genre.name}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}