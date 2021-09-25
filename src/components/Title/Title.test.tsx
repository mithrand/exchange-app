import React from 'react';
import { render, screen } from '@testing-library/react';

import Title from './Title.container';

describe('Title', () => {
  it('Title render children', async () => {
    const text = 'Sell GBP';
    render(<Title>{text}</Title>);
    const title = await screen.findAllByText(text);
    expect(title).toHaveLength(1);
  });
});
