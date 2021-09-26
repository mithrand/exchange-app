import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BaseButton from './BaseButton';

export default {
  title: 'Components/BaseButton',
  component: BaseButton,
} as ComponentMeta<typeof BaseButton>;

const Template: ComponentStory<typeof BaseButton> = (args) => (
  <BaseButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Click here',
  onClick: () => alert('on Button click'),
};
