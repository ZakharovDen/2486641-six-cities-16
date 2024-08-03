import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { Offers } from './types/types';
import { fetchOffersAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffersAction());
const favoriteOffers: Offers = [];

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App favoriteOffers={favoriteOffers} />
    </Provider>
  </React.StrictMode>
);
