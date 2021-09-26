import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ConfirmationMessage from './ConfirmationMessage.ui';
import currencies from '../../data/currencies';

export default {
  title: 'Components/ConfirmationMessage',
  component: ConfirmationMessage,
} as ComponentMeta<typeof ConfirmationMessage>;

const Template: ComponentStory<typeof ConfirmationMessage> = (args) => (
  <ConfirmationMessage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  closeModal: () => alert('close Modal'),
  currencyFrom: currencies.GBP,
  quantityFrom: 200,
  currencyTo: currencies.USD,
  quantityTo: 185.52,
};
