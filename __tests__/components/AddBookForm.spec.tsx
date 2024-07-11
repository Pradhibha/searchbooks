import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AddBookForm from '../../components/AddBookForm';
import { withMockedRouter } from '../../__mocks__/mockNextRouter';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AddBookForm', () => {
  it('renders the form fields', () => {
    render(withMockedRouter(<AddBookForm />));
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/authors/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/published date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ISBN/i)).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { message: 'Book added successfully!' } });

    render(withMockedRouter(<AddBookForm />));

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/authors/i), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/published date/i), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: 'Test Genre' } });
    fireEvent.change(screen.getByLabelText(/ISBN/i), { target: { value: '1234567890123' } });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/book added successfully/i)).toBeInTheDocument();
    });
  });
});
