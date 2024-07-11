import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';


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

const initialQuery: QueryState = {
  title: '',
  author: '',
  startDate: '',
  endDate: '',
  genre: '',
  sortBy: 'title',
  order: 'ASC',
  page: 1,
  pageSize: 10,
  availability: false,
};

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState<QueryState>(initialQuery);
  const [results, setResults] = useState([]);

  const resetForm = () => {
    setQuery(initialQuery); // Reset form fields to initial values
    searchBooks(initialQuery); // Load initial query values
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const searchBooks = async (queryParams: QueryState = query) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
      Authorization: `Bearer ${token}`,
      };
      const response = await axios.get('/api/books', { params: queryParams, headers });
      setResults(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      page,
    }));
    searchBooks({ ...query, page });
  };

  useEffect(() => {
    searchBooks();
  }, [query.page]);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Book Search
      </Typography>
      <SearchForm query={query} handleChange={handleChange} searchBooks={() => searchBooks(query)} resetForm={resetForm} setSearchResults={setResults} />
      <Box mt={4}>
        <SearchResults results={results} pageSize={query.pageSize} page={query.page} onPageChange={handlePageChange} />
      </Box>
      <Box mt={2}>
        <Button id="addbook" variant="contained" color="primary" href="/add-book">
          Add Book
        </Button>
      </Box>
    </Box>
  );
};

export default SearchPage;
