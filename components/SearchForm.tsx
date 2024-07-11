import React, { ChangeEvent } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Checkbox, FormControlLabel, Box } from '@mui/material';


interface QueryState {
  title: string;
  author: string;
  startDate: string;
  endDate: string;
  genre: string;
  sortBy: string;
  order: string;
  page: number;
  pageSize: number;
  availability: boolean;
}

interface SearchFormProps {
  query: QueryState;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<{ name?: string; value: unknown }>) => void;
  searchBooks: () => void;
  resetForm: () => void;
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchForm: React.FC<SearchFormProps> = ({ query, handleChange, searchBooks, resetForm, setSearchResults }) => {
  const handleReset = () => {
    resetForm(); // Reset form fields
    setSearchResults([]); // Reset search results
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Box display="flex" flexWrap="wrap" gap={2} mb={2} justifyContent="center">
        <TextField
          label="Search by title"
          name="title"
          value={query.title}
          onChange={handleChange}
          fullWidth
          style={{ flex: '1 1 25%', margin: '0.5rem' }}
        />
        <TextField
          label="Search by author"
          name="author"
          value={query.author}
          onChange={handleChange}
          fullWidth
          style={{ flex: '1 1 25%', margin: '0.5rem' }}
        />
        <TextField
          label="Start date"
          type="date"
          name="startDate"
          value={query.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          style={{ flex: '1 1 25%', margin: '0.5rem' }}
        />
        <TextField
          label="End date"
          type="date"
          name="endDate"
          value={query.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          style={{ flex: '1 1 25%', margin: '0.5rem' }}
        />
        <TextField
          label="Genre"
          name="genre"
          value={query.genre}
          onChange={handleChange}
          fullWidth
          style={{ flex: '1 1 25%', margin: '0.5rem' }}
        />
        <FormControl fullWidth style={{ flex: '1 1 25%', margin: '0.5rem' }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            name="sortBy"
            id="sortBy"
            value={query.sortBy}
            onChange={handleChange}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="authors">Author</MenuItem>
            <MenuItem value="published_date">Publication Date</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ flex: '1 1 25%', margin: '0.5rem' }}>
          <InputLabel>Order</InputLabel>
          <Select
            name="order"
            value={query.order}
            onChange={handleChange}
          >
            <MenuItem value="ASC">Ascending</MenuItem>
            <MenuItem value="DESC">Descending</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Page"
          type="number"
          name="page"
          value={query.page}
          onChange={handleChange}
          fullWidth
          style={{ flex: '1 1 25%', margin: '0.5rem' }}
        />
        <TextField
          label="Page Size"
          type="number"
          name="pageSize"
          value={query.pageSize}
          onChange={handleChange}
          fullWidth
          style={{ flex: '1 1 25%', margin: '0.5rem' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={query.availability}
              onChange={handleChange}
              name="availability"
            />
          }
          label="In-stock only"
          style={{ flex: '1 1 25%', margin: '0.5rem' }}
        />
      </Box>
      <Box display="flex" justifyContent="center" mt={2} gap={2}>
        <Button data-testid='searchButton' variant="contained" color="primary" onClick={searchBooks}>Search</Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>Reset</Button>
      </Box>
    </Box>
  );
};

export default SearchForm;
