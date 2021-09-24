import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export const render = () => {
  const node = document.getElementById('exchangeApp');
  if (node) {
    ReactDOM.render(<App />, node);
  }
};

export default render;
