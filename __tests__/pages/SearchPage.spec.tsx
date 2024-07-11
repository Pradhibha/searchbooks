import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchPage from '../../pages/SearchPage';

describe('SearchPage', () => {
  it('renders SearchForm and SearchResults', () => {
    render(<SearchPage />);
    expect(screen.getByLabelText(/search by title/i)).toBeInTheDocument();
  });
});
