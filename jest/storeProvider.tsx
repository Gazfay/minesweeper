import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';

interface IStoreProvider {
  children: React.ReactNode;
}

function StoreProvider({ children }: IStoreProvider) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default StoreProvider;