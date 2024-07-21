import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import getOffers from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const offers = getOffers();

root.render(
  <React.StrictMode>
    <App offers={offers} />
  </React.StrictMode>
);
