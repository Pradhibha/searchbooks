import React from 'react';
import { render, screen } from '@testing-library/react';
import AddBookPage from '../../pages/add-book';
import { withMockedRouter } from '../../__mocks__/mockNextRouter';


describe('AddBookPage', () => {
  it('renders AddBookForm', () => {
    render(withMockedRouter(<AddBookPage />));
    expect(screen.getByText(/add book/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  });
});
