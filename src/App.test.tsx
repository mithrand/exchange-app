import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('App render as expected', async () => {
    render(<App />);
    const title = await screen.findAllByText('Sell GBP');
    expect(title).toHaveLength(1);
    const hello = await screen.findAllByText('Hello world');
    expect(hello).toHaveLength(1);
  });
});
