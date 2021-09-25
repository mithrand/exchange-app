import React from 'react';

import ExchangeButton, {
  Props as ExchangeButtonProps,
} from './ExchangeButton.ui';


export interface Props extends ExchangeButtonProps {}

export const ExchangeButtonContainer = (props: Props) => <ExchangeButton {...props} />;

export default ExchangeButtonContainer;
