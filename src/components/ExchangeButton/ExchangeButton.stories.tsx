import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import currencies from '../../data/currencies';

import ExchangeButton from './ExchangeButton.ui';

export default {
  title: 'Components/ExchangeButton',
  component: ExchangeButton,
} as ComponentMeta<typeof ExchangeButton>;

const Template: ComponentStory<typeof ExchangeButton> = (args) => (
  <ExchangeButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  account: {
    id: '12345',
    currency: currencies.GBP,
    balance: 15214.561,
  },
  message: 'this is a message',
  quantity: 0,
  onCurrencyButtonClick: () => {
    alert('Click on currncy button');
  },
};
