// pages/add-book.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import AddBookForm from '../components/AddBookForm';

const AddBookPage: React.FC = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Book
      </Typography>
      <AddBookForm />
    </Box>
  );
};

export default AddBookPage;
