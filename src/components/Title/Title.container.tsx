import React from 'react';
import Title from './Title.ui';

interface Props {
  children: string;
}

const TitleContainer = ({ children }: Props) => <Title>{children}</Title>;

export default TitleContainer;
