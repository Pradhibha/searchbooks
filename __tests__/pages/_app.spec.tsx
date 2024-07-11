import React from 'react';
import { render } from '@testing-library/react';
import App from '../../pages/_app';
import { AppProps } from 'next/app';

const pageProps = {};

describe('App', () => {
  it('renders the page component', () => {
    const { container } = render(<App Component={() => <div>Test Component</div>} pageProps={pageProps} />);
    expect(container).toHaveTextContent('Test Component');
  });
});
