import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider value={muiCache}>
      <Provider store={store}>
        <App />
      </Provider>
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

