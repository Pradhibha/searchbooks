import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from '../../components/SearchResults';

const results = [
  {
    id: 1,
    title: 'Test Title',
    authors: 'Test Author',
    description: 'Test Description',
    published_date: '2022-01-01',
    genre: 'Test Genre',
    isbn: '1234567890123',
    availability: 1,
  },
];

describe('SearchResults', () => {
  it('renders search results', () => {
    render(<SearchResults results={results} pageSize={10} page={1} onPageChange={jest.fn()} />);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByText(/test author/i)).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
    expect(screen.getByText(/january 1, 2022/i)).toBeInTheDocument();
    expect(screen.getByText(/test genre/i)).toBeInTheDocument();
    expect(screen.getByText(/1234567890123/i)).toBeInTheDocument();
    expect(screen.getByText(/in stock/i)).toBeInTheDocument();
  });
});
