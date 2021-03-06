import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ExchangeRate from './ExchangeRate.ui';
import currencies from '../../data/currencies';


export default {
  title: 'Components/ExchangeRate',
  component: ExchangeRate,
} as ComponentMeta<typeof ExchangeRate>;

const Template: ComponentStory<typeof ExchangeRate> = (args) => <ExchangeRate {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  from: currencies.EUR,
  to: currencies.GBP,
  exchangeRate: 1.1785130,
};
