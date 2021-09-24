import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('App render as expected', async () => {
    render(<App />);
    const items = await screen.findAllByText('Hello world');
    expect(items).toHaveLength(1);
  });
});
