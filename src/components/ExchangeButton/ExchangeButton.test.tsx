import React from 'react';
import { render, screen } from '@testing-library/react';

import ExchangeButton from './ExchangeButton.container';

describe('ExchangeButton', () => {
  it('ExchangeButton renders', async () => {
    const text = 'ExchangeButton';
    render(<ExchangeButton />);
    const content = await screen.findAllByText(text);
    expect(content).toHaveLength(1);
  });
});
