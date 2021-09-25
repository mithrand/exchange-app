import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ExchangeButton from './ExchangeButton.ui';

export default {
  title: 'Components/ExchangeButton',
  component: ExchangeButton,
} as ComponentMeta<typeof ExchangeButton>;

const Template: ComponentStory<typeof ExchangeButton> = (args) => <ExchangeButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
