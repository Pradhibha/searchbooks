import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  published_date: string;
  genre: string;
  isbn: string;
  availability: number;
}

interface SearchResultsProps {
  results: Book[];
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, pageSize, page, onPageChange }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'authors', headerName: 'Authors', width: 200 },
    { field: 'description', headerName: 'Description', width: 400 },
    {
      field: 'published_date',
      headerName: 'Published Date',
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return (
          <span>
            {date.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        );
      },
    },
    { field: 'genre', headerName: 'Genre', width: 150 },
    { field: 'isbn', headerName: 'ISBN', width: 150 },
    {
      field: 'availability',
      headerName: 'Availability',
      width: 150,
      renderCell: (params) => {
        return params.value === 1 ? 'In Stock' : 'Out of Stock';
      },
    },
  ];

  return (
    <Box mt={2} style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={results}
        columns={columns}
        pageSize={pageSize}
        page={page - 1}
        onPageChange={(params) => onPageChange(params.page + 1)}
        pagination
      />
    </Box>
  );
};

export default SearchResults;
