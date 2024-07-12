import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Button, Checkbox, FormControlLabel, Snackbar, Alert, Box } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import FormField from './FormField';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  authors: yup.string().required('Authors are required'),
  description: yup.string().required('Description is required'),
  published_date: yup.date().required('Published date is required'),
  genre: yup.string().required('Genre is required'),
  isbn: yup.string()
    .matches(/^[0-9]{13}$/, 'ISBN must be exactly 13 digits')
    .required('ISBN is required'),
});

const AddBookForm: React.FC = () => {
  const router = useRouter();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <Formik
      initialValues={{
        title: '',
        authors: '',
        description: '',
        published_date: '',
        genre: '',
        availability: true,
        isbn: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const token = localStorage.getItem('token');
          await axios.post('/api/books', values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setSnackbar({
            open: true,
            message: 'Book added successfully!',
            severity: 'success',
          });
          setTimeout(() => {
            router.push('/SearchPage'); 
          }, 2000);
        } catch (error) {
          console.error('Error adding book:', error);
          setSnackbar({
            open: true,
            message: error.response?.data?.error || 'An error occurred',
            severity: 'error',
          });
          setErrors({ submit: error.message });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Box p={3}>
            <FormField name="title" label="Title" />
            <FormField name="authors" label="Authors" />
            <FormField name="description" label="Description" multiline rows={4} />
            <FormField name="published_date" label="Published Date" type="date" />
            <FormField name="genre" label="Genre" />
            <FormControlLabel
              control={<Checkbox name="availability" defaultChecked color="primary" />}
              label="Available"
            />
            <FormField name="isbn" label="ISBN" />
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Submit</Button>
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={handleCloseSnackbar} severity={snackbar.severity as 'error' | 'warning' | 'info' | 'success'}>
                {snackbar.message}
              </Alert>
            </Snackbar>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddBookForm;
