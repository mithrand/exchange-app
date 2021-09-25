import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('App render as expected', async () => {
    render(<App />);
    const title = await screen.findAllByText('Sell GBP');
    expect(title).toHaveLength(1);
    const exchangeRate = await screen.findAllByText('1 € = 1,1705 £');
    expect(exchangeRate).toHaveLength(1);
  });
});
