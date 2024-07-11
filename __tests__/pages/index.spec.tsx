import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';
import { withMockedRouter } from '../../__mocks__/mockNextRouter';


describe('Home', () => {
  it('renders LoginPage', () => {
    render(withMockedRouter(<Home />));
    expect(screen.findAllByText(/Login/i)).toBeDefined();
  });
});
