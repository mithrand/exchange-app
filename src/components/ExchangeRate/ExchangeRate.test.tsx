import React from 'react';
import { render, screen } from '@testing-library/react';

import ExchangeRate from './ExchangeRate.container';

describe('ExchangeRate', () => {
  it('ExchangeRate renders', async () => {
    const text = '1 € = 1,1705 £';
    render(<ExchangeRate />);
    const content = await screen.findAllByText(text);
    expect(content).toHaveLength(1);
  });
});
