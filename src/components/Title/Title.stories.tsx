import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Title from './Title.ui';

export default {
  title: 'Example/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Sell GBP',
};
