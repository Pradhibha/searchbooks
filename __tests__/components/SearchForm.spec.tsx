import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../../components/SearchForm';

const query = {
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

describe('SearchForm', () => {
  it('renders the form fields', () => {
    render(<SearchForm query={query} handleChange={jest.fn()} searchBooks={jest.fn()} resetForm={jest.fn()} setSearchResults={jest.fn()} />);
    expect(screen.findAllByText(/search by title/i)).toBeDefined();
    expect(screen.findByText('Search by author')).toBeDefined();
    expect(screen.findAllByText(/start date/i)).toBeDefined();
    expect(screen.findAllByText(/end date/i)).toBeDefined();
    expect(screen.findAllByText(/genre/i)).toBeDefined();
    expect(screen.findAllByText(/sort by/i)).toBeDefined();
    expect(screen.findAllByText(/order/i)).toBeDefined();
    expect(screen.findAllByText(/page/i)).toBeDefined();
    expect(screen.findAllByText(/page size/i)).toBeDefined();
    expect(screen.findAllByText(/in-stock only/i)).toBeDefined();
  });

  it('calls searchBooks on form submission', () => {
    const searchBooksMock = jest.fn();
    const { getByTestId } = render(<SearchForm query={query} handleChange={jest.fn()} searchBooks={searchBooksMock} resetForm={jest.fn()} setSearchResults={jest.fn()} />);
    fireEvent.click(getByTestId('searchButton'))
    expect(searchBooksMock).toHaveBeenCalledTimes(1);

  });

  it('calls resetForm on reset button click', () => {
    const resetFormMock = jest.fn();
    render(<SearchForm query={query} handleChange={jest.fn()} searchBooks={jest.fn()} resetForm={resetFormMock} setSearchResults={jest.fn()} />);
    fireEvent.click(screen.getByText(/reset/i));
    expect(resetFormMock).toHaveBeenCalledTimes(1);
  });
});
