import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import StoreProvider from '../jest/storeProvider';

test('renders App component', () => {
  const { getByTestId } = render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );

  expect(getByTestId('App')).toBeInTheDocument();
});
