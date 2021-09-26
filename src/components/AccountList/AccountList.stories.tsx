/* eslint-disable no-console */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import accounts from '../../data/accounts';

import AccountList from './AccountList.ui';

export default {
  title: 'Components/AccountList',
  component: AccountList,
} as ComponentMeta<typeof AccountList>;

const Template: ComponentStory<typeof AccountList> = (args) => (
  <AccountList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  accounts,
  onAccountClick: () => console.log('account click'),
  onCloseClick: () => console.log('close click'),
  onSearchBoxChange: () => console.log('searching....'),
};
